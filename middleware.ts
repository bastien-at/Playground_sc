import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Autoriser les routes statiques, API et assets
  if (pathname.startsWith("/api") || 
      pathname.startsWith("/_next") || 
      pathname.startsWith("/favicon.ico") ||
      pathname.includes("cascade-browser-integration.js")) {
    return NextResponse.next();
  }

  // Si l'utilisateur essaie d'accéder à la page de login, on le laisse passer
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur est authentifié via cookie
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";

  if (!isAuthenticated) {
    // Rediriger vers la page de login si non authentifié
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Matcher pour protéger toutes les routes sauf les exclusions ci-dessus
    "/((?!api|_next|favicon.ico|cascade-browser-integration.js).*)",
  ],
};
