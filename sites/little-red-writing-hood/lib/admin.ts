import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { isOwner } from "./admin-policy";
import type { MailConfig } from "./mail";

export function runtimeConfig(): MailConfig & {ADMIN_EMAIL?: string} {
  return env as unknown as MailConfig & {ADMIN_EMAIL?: string};
}
export async function ownerAccess() {
  return isOwner(await getChatGPTUser(), runtimeConfig().ADMIN_EMAIL);
}
