import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jxhn",
  description: "probably nothing...",
  metadataBase: new URL("https://jxhn.vercel.app"),
  openGraph: {
    title: "jxhn",
    description: "probably nothing...",
    url: "https://jxhn.vercel.app",
    siteName: "jxhn",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "jxhn",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "jxhn",
    description: "probably nothing...",
    images: ["/og-image.jpg"],
    creator: "@0xjooohn",
  },

  other: {
    "telegram:channel": "@jooohnng",
  },
};

// Script that runs before React hydrates to prevent flash
const themeScript = `
  (function() {
    const DEFAULT_COLOR = '#9896FF';
    
    // Set theme
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    
    // Set hyper color
    const color = localStorage.getItem('hyperColor') || DEFAULT_COLOR;
    document.documentElement.style.setProperty('--hyper', color);
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
