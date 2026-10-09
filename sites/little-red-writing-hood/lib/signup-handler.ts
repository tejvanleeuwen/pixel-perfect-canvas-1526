import { signupSchema } from "./signup";
import { sendSignupMail, type MailConfig } from "./mail";

export async function handleSignup(request: Request, db: D1Database, mailConfig: MailConfig = {}): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({error:"Invalid origin"},{status:403});
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({error:"Expected JSON"},{status:415});
  if (Number(request.headers.get("content-length")) > 12000) return Response.json({error:"Request too large"},{status:413});
  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 12000) return Response.json({error:"Request too large"},{status:413});
    payload = JSON.parse(body);
  } catch { return Response.json({error:"Invalid request"},{status:400}); }
  const result = signupSchema.safeParse(payload);
  if (!result.success) return Response.json({error:"Please check your details"},{status:400});
  const data = result.data;
  try {
    const id = crypto.randomUUID();
    await db.prepare(`INSERT INTO early_access_signups
      (id, first_name, email, age_range, country, interest, stationery_products, pen_pal_motivation, consent_version)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(email) DO NOTHING`).bind(
        id, data.first_name, data.email.toLowerCase(), data.age_range,
        data.country, data.interest, JSON.stringify(data.stationery_products),
        data.pen_pal_motivation || null, "email-updates-2026-10-09"
      ).run();
    // A duplicate email has a different existing ID, so it cannot trigger mail again.
    try { await sendSignupMail(db,id,mailConfig); }
    catch { console.error("Signup saved; mail processing needs inspection"); }
    return Response.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  } catch {
    console.error("Signup storage failed");
    return Response.json({error:"Could not save your signup. Please try again."},{status:503});
  }
}
