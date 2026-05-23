import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "starship — jxhn",
  description:
    "a tribute to spacex's starship + super heavy. not affiliated with spacex.",
  alternates: { canonical: "https://starship.jxhn.xyz" },
  openGraph: {
    title: "starship",
    description: "a tribute to spacex's starship + super heavy.",
    url: "https://starship.jxhn.xyz",
    type: "website",
  },
};

export default function StarshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} starship-scope min-h-screen bg-[#0A0A0A] text-[#D6DAE3] antialiased`}
    >
      {children}
    </div>
  );
}
