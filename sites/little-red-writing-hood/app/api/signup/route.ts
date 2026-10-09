import { getSignupDatabase } from "@/db/binding";
import { handleSignup } from "@/lib/signup-handler";
import { runtimeConfig } from "@/lib/admin";

export async function POST(request: Request) {
  try { return await handleSignup(request, getSignupDatabase(), runtimeConfig()); }
  catch { return Response.json({error:"Signup is temporarily unavailable. Please try again."},{status:503}); }
}
