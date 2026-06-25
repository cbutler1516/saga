import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PORTAL_SESSION_COOKIE,
} from "@/lib/portal/constants";
import { readPortalSessionFromCookieValue } from "@/lib/portal/session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(PORTAL_SESSION_COOKIE)?.value;
  const session = readPortalSessionFromCookieValue(sessionCookie);

  if (pathname.startsWith("/portal")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/login"],
};
