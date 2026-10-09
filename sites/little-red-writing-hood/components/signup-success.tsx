const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/littleredwritinghooddd/" },
  { name: "TikTok", href: "https://www.tiktok.com/@littleredwritinghooddd" },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-x-6 gap-y-3 ${className}`}>
      {socialLinks.map(({ name, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="font-body text-base underline underline-offset-4 transition-opacity hover:opacity-75">
          Follow on {name} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

export function SignupSuccess({ firstName }: { firstName: string }) {
  return (
    <div className="py-10 text-center" role="status" aria-live="polite">
      <h3 className="font-display text-3xl text-cherry sm:text-4xl">Thank you, {firstName}!</h3>
      <p className="mt-4 text-muted-foreground">
        You're on the list for future email updates. I'm still getting things started,
        so there may be a little wait before you hear from me by email.
      </p>
      <p className="mt-4 text-muted-foreground">Until then, come say hello on Instagram or TikTok for snail mail, unboxings and lovely finds.</p>
      <SocialLinks className="mt-6 text-cherry" />
    </div>
  );
}
