import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import { person, hero } from "@/lib/content";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const title = `${person.name} — ${person.role}`;

// Set NEXT_PUBLIC_SITE_URL once the domain is live so share cards resolve.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: title,
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description: hero.lede,
  applicationName: person.name,
  authors: [{ name: person.name, url: person.github }],
  keywords: [
    "Abdul Rehman",
    "software engineer",
    "backend engineer",
    "AI voice agents",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Lahore",
    "Pakistan",
  ],
  openGraph: {
    title,
    description: hero.lede,
    type: "profile",
    locale: "en_US",
    siteName: person.name,
    images: [ogImage],
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: hero.lede,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Scroll-reveal elements ship with opacity:0. Without JS there is
            nothing to animate them back in, so unhide everything. */}
        <noscript>
          <style>{`[data-reveal],[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${sans.variable} ${mono.variable} ${display.variable} grain antialiased`}
      >
        <a
          href="#work"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:bg-ember focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
