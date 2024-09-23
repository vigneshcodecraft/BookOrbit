import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const middleware = createMiddleware(routing);
export default NextAuth(authConfig).auth;
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
