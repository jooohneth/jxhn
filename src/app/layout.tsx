import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { AgentationToolbar } from "@/components/agentation-toolbar";
import { ThemeProvider } from "@/components/theme-provider";

const SITE_URL = "https://jxhn.xyz";
const NAME = "jxhn / john / thai";
const TAGLINE = "probably nothing...";
const DESCRIPTION =
  "john / thai — senior devrel engineer @layerzero, prev @mantle. builder, supporter of founders @sozuhaus. i build, learn, and ship in public.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "jxhn — john / thai",
    template: "%s · jxhn",
  },
  description: DESCRIPTION,
  applicationName: "jxhn",
  generator: "Next.js",
  keywords: [
    "jxhn",
    "john thai",
    "0xjooohn",
    "jooohneth",
    "devrel",
    "developer relations",
    "layerzero",
    "mantle",
    "sozu haus",
    "crypto",
    "defi",
    "web3",
    "ethereum",
    "stablecoins",
    "prediction markets",
    "personal website",
  ],
  authors: [{ name: "john thai", url: SITE_URL }],
  creator: "john thai",
  publisher: "john thai",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: NAME,
    description: TAGLINE,
    url: SITE_URL,
    siteName: "jxhn",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "jxhn — john / thai. devrel engineer, builder, supporter of founders.",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "john",
    lastName: "thai",
    username: "0xjooohn",
  },
  twitter: {
    card: "summary_large_image",
    title: NAME,
    description: TAGLINE,
    images: [
      {
        url: "/og-image.jpg",
        alt: "jxhn — john / thai. devrel engineer, builder, supporter of founders.",
      },
    ],
    creator: "@0xjooohn",
    site: "@0xjooohn",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "jxhn",
    statusBarStyle: "black-translucent",
  },
  other: {
    "telegram:channel": "@jooohnng",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#14120b" },
  ],
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "john thai",
  alternateName: ["jxhn", "john", "thai", "0xjooohn"],
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  jobTitle: "Senior DevRel Engineer",
  worksFor: {
    "@type": "Organization",
    name: "LayerZero",
    url: "https://layerzero.network",
  },
  nationality: ["Ukrainian", "Vietnamese"],
  homeLocation: { "@type": "Country", name: "Canada" },
  knowsLanguage: ["en", "uk", "vi", "ru"],
  sameAs: [
    "https://x.com/0xjooohn",
    "https://github.com/jooohneth",
    "https://www.linkedin.com/in/jooohneth/",
  ],
};

// Script that runs before React hydrates to prevent flash
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased font-sans">
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <AgentationToolbar />
      </body>
    </html>
  );
}
