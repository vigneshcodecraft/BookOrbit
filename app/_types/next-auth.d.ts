import { Session, User } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface CustomUser {
    role?: string | null;
    name?: string | null;
  }
  interface User extends CustomUser {}

  interface CustomSession extends Session {
    user?: User;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     user?: User;
//     role?: string | null;
//   }
// }
