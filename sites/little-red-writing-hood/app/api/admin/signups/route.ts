import { ownerAccess, runtimeConfig } from "@/lib/admin";
import { csvCell } from "@/lib/admin-policy";
import { mailReady } from "@/lib/mail";
import { getSignupDatabase } from "@/db/binding";
export const dynamic = "force-dynamic";
const headers = {"Cache-Control":"private, no-store", "Vary":"Cookie"};
export async function GET(request: Request) {
  if (!await ownerAccess()) return Response.json({error:"Geen toegang"},{status:403,headers});
  try {
    const db = getSignupDatabase();
    const url = new URL(request.url);
    const count = await db.prepare("SELECT COUNT(*) AS total FROM early_access_signups").first<{total:number}>();
    if (url.searchParams.get("format") === "csv") {
      if ((count?.total ?? 0) > 10000) return Response.json({error:"Deze lijst is te groot voor één export. Vraag een volledige export aan."},{status:413,headers});
      const rows = await db.prepare("SELECT first_name, email, age_range, country, interest, stationery_products, pen_pal_motivation, created_at, consent_version, welcome_status, notification_status FROM early_access_signups ORDER BY created_at DESC, id DESC").all<Record<string,unknown>>();
      const fields = ["first_name","email","age_range","country","interest","stationery_products","pen_pal_motivation","created_at","consent_version","welcome_status","notification_status"];
      const csv = "\uFEFF" + [fields.map(csvCell).join(","),...rows.results.map(row=>fields.map(f=>csvCell(row[f])).join(","))].join("\r\n");
      return new Response(csv,{headers:{...headers,"Content-Type":"text/csv; charset=utf-8","Content-Disposition":"attachment; filename=inschrijvingen.csv"}});
    }
    const page = Math.max(0,Math.min(100000,Math.floor(Number(url.searchParams.get("page")) || 0)));
    const rows = await db.prepare("SELECT * FROM early_access_signups ORDER BY created_at DESC, id DESC LIMIT 50 OFFSET ?").bind(page*50).all();
    return Response.json({rows:rows.results,total:count?.total??0,page,mailReady:mailReady(runtimeConfig())},{headers});
  } catch { return Response.json({error:"De inschrijvingen konden niet worden geladen."},{status:503,headers}); }
}
