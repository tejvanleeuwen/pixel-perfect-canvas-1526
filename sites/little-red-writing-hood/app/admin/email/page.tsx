import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { runtimeConfig } from "@/lib/admin";
import { isOwner } from "@/lib/admin-policy";
import { welcomeEmail } from "@/lib/welcome-email";
export const dynamic = "force-dynamic";
export default async function EmailPreview() {
  const user = await requireChatGPTUser("/admin/email");
  if (!isOwner(user,runtimeConfig().ADMIN_EMAIL)) return <main>Geen toegang.</main>;
  const email = welcomeEmail("Emma");
  return <main style={{background:"#f4efe5",padding:24,minHeight:"100vh"}}><div style={{maxWidth:760,margin:"0 auto"}}><a href="/admin">← Terug naar inschrijvingen</a><h1 style={{fontSize:28,margin:"20px 0"}}>Je welkomstmail</h1><p style={{marginBottom:16}}>Onderwerp: {email.subject}</p><p style={{marginBottom:16}}>Voorbeeld met de naam Emma. Dit voorbeeld verstuurt geen e-mail.</p><iframe title="Voorbeeld welkomstmail" sandbox="allow-popups allow-popups-to-escape-sandbox" srcDoc={email.html} style={{width:"100%",height:1050,border:0}}/></div></main>;
}
