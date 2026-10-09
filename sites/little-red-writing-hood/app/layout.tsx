import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Red Writing Hood | Join the First Chapter",
  description: "Snail mail, lovely finds and stationery ideas. Sign up for future email updates.",
  openGraph: { title: "Little Red Writing Hood", description: "Snail mail, lovely finds and stationery ideas.", type: "website" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600&family=Karla:wght@400;500;700&display=swap" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
