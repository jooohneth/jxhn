import { NextRequest, NextResponse } from "next/server";

const STARSHIP_HOSTS = new Set([
  "starship.jxhn.xyz",
  "starship.localhost",
  "starship.localhost:3000",
]);

const V2_HOSTS = new Set([
  "v2.jxhn.xyz",
  "v2.localhost",
  "v2.localhost:3000",
]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.toLowerCase() ?? "";
  const { pathname } = req.nextUrl;

  if (STARSHIP_HOSTS.has(host) && !pathname.startsWith("/starship")) {
    const url = req.nextUrl.clone();
    url.pathname = `/starship${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  if (V2_HOSTS.has(host) && !pathname.startsWith("/v2")) {
    const url = req.nextUrl.clone();
    url.pathname = `/v2${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|_vercel/|.*\\..*).*)"],
};
