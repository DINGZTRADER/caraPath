import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_SITE_ORIGIN = "https://carapath-client-review-fixed-ms8h130jx.vercel.app";
const PUBLIC_HOSTS = new Set(["theclarapath.org", "www.theclarapath.org"]);

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (PUBLIC_HOSTS.has(host)) {
    const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, PUBLIC_SITE_ORIGIN);
    return NextResponse.rewrite(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*"
};
