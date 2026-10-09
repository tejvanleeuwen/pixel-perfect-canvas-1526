import { env } from "cloudflare:workers";

export function getSignupDatabase(): D1Database {
  if (!env.DB) throw new Error("Signup storage is unavailable");
  return env.DB;
}
