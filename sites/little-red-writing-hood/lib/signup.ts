import { z } from "zod";

export const signupSchema = z.object({
  first_name: z.string().trim().min(1, "Please tell us your first name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  age_range: z.enum(["18-24", "25-30", "31-35", "36-40", "40+"]),
  country: z.string().trim().min(1, "Please tell us your country").max(80),
  interest: z.enum(["stationery", "pen_pal", "both"]),
  stationery_products: z.array(z.enum(["stickers", "washi_tape", "letter_paper", "envelopes"])).max(4),
  pen_pal_motivation: z.string().trim().max(1000).optional().default(""),
});

export type SignupInput = z.infer<typeof signupSchema>;

export async function submitSignup({data}: {data: SignupInput}) {
  const response = await fetch('/api/signup', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Could not save signup');
  return response.json() as Promise<{ok: true}>;
}
