export function isOwner(user: {email: string; userId: string} | null, ownerEmail?: string): boolean {
  return !!user?.userId && !!ownerEmail && user.email.toLowerCase() === ownerEmail.trim().toLowerCase();
}

export function csvCell(value: unknown): string {
  let text = String(value ?? "");
  if (/^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
