import { welcomeEmail } from "./welcome-email";
export type MailConfig = {RESEND_API_KEY?: string; MAIL_FROM?: string; MAIL_REPLY_TO?: string; NOTIFY_EMAIL?: string; MAIL_ENABLED?: string};
export function mailReady(c: MailConfig) {
  return c.MAIL_ENABLED === "true" && !!c.RESEND_API_KEY && !!c.MAIL_FROM && !!c.MAIL_REPLY_TO && !!c.NOTIFY_EMAIL;
}
export async function sendSignupMail(db: D1Database, id: string, config: MailConfig, send: typeof fetch = fetch) {
  if (!mailReady(config)) return;
  for (const kind of ["welcome", "notification"] as const) {
    const column = kind === "welcome" ? "welcome_status" : "notification_status";
    // Only one request can claim each message; repeated signups never resend it.
    const row = await db.prepare(`UPDATE early_access_signups SET ${column} = 'sending' WHERE id = ? AND ${column} = 'pending' RETURNING id, first_name, email, interest`).bind(id).first<{id:string;first_name:string;email:string;interest:string}>();
    if (!row) continue;
    const mail = kind === "welcome" ? welcomeEmail(row.first_name) : {
      subject: "Nieuwe inschrijving bij Little Red Writing Hood",
      text: `Er is een nieuwe inschrijving.\n\nNaam: ${row.first_name}\nE-mailadres: ${row.email}\nInteresse: ${row.interest}\n\nBekijk alle details in het privébeheer van je website.`,
    };
    try {
      const result = await send("https://api.resend.com/emails", {
        method:"POST", signal:AbortSignal.timeout(8000),
        headers:{"Authorization":`Bearer ${config.RESEND_API_KEY}`,"Content-Type":"application/json","Idempotency-Key":`signup-${id}-${kind}-v1`},
        body:JSON.stringify({from:config.MAIL_FROM,to:[kind === "welcome" ? row.email : config.NOTIFY_EMAIL],reply_to:config.MAIL_REPLY_TO,...mail}),
      });
      // Accepted means the provider received it, not that it reached an inbox.
      await db.prepare(`UPDATE early_access_signups SET ${column} = ? WHERE id = ?`).bind(result.ok ? "accepted" : "failed",id).run();
    } catch {
      // A timeout may occur after acceptance. Keep it for inspection, never blindly resend.
      await db.prepare(`UPDATE early_access_signups SET ${column} = 'unknown' WHERE id = ?`).bind(id).run();
    }
  }
}
