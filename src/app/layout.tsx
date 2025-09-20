import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://jxhn.xyz"),
  openGraph: {
    title: "jxhn",
    description: "probably nothing...",
    url: "https://jxhn.xyz",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
