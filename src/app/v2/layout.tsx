import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "jxhn — v2",
  description:
    "john / thai — personal site in x.ai's visual language. v2.jxhn.xyz.",
  alternates: { canonical: "https://v2.jxhn.xyz" },
  openGraph: {
    title: "jxhn — v2",
    description: "personal site v2 in x.ai's visual language.",
    url: "https://v2.jxhn.xyz",
    type: "website",
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="v2-scope antialiased">{children}</div>;
}
