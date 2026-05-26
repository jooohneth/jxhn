import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  experimental: { mdxRs: true },
};

const withMDX = createMDX({});

initOpenNextCloudflareForDev();

export default withMDX(nextConfig);
