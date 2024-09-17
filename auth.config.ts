import type {
  Account,
  CustomSession,
  NextAuthConfig,
  Profile,
  User,
} from "next-auth";
import { findUserByEmail } from "./lib/actions";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "admin";
      const isOnAdminDashboard = nextUrl.pathname.startsWith("/admin");
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      // if (isLoggedIn) {
      //   if (isAdmin) {
      //     // admin is logged in
      //     if (isOnAdminDashboard) {
      //       return true;
      //     } else if (isOnDashboard) {
      //       return true;
      //     } else {
      //       return Response.redirect(new URL("/admin", nextUrl));
      //     }
      //   } else {
      //     // Regular user is logged in
      //     if (isOnDashboard) {
      //       return true;
      //     } else {
      //       return Response.redirect(new URL("/dashboard", nextUrl));
      //     }
      //   }
      // } else {
      //   return false;
      // }
      if (isOnAdminDashboard) {
        if (isLoggedIn && isAdmin) return true;
        return false;
      }
      if (isLoggedIn && isAdmin) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    jwt({ token, user, profile }) {
      if (user) {
        const userData = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        };
        token = { ...userData };
        if (profile?.picture) token.image = profile.picture;
      }
      return token;
    },
    session({ session, token }: { session: CustomSession; token: any }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
