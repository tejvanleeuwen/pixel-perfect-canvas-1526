import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { runtimeConfig } from "@/lib/admin";
import { isOwner } from "@/lib/admin-policy";
import AdminDashboard from "./dashboard";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  if (!isOwner(user,runtimeConfig().ADMIN_EMAIL)) return <main style={{padding:48}}>Deze pagina is alleen voor de eigenaar van Little Red Writing Hood.</main>;
  return <AdminDashboard/>;
}
