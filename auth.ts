import NextAuth, { CustomSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/authUtils";
import { createUser, findUserByEmail } from "@/lib/actions";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { error } from "console";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials): Promise<any> => {
        try {
          console.log(credentials);
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Credentials required");
          }

          const userExists = await findUserByEmail(
            credentials?.email as string
          );

          const matchPassword = await bcrypt.compare(
            credentials?.password as string,
            userExists?.password!
          );

          if (!userExists || !matchPassword) {
            return null;
            // return NextResponse.json({
            //   message: "Invalid User Credentials",
            // });
          }

          if (userExists) {
            const userData = {
              id: userExists?.id,
              name: `${userExists?.firstName} ${userExists?.lastName}`,
              email: userExists?.email,
              phone: userExists?.phone,
              role: userExists?.role,
              address: userExists?.address,
            };

            return userData;
          }
        } catch (error: any) {
          console.error("Credential Auth Error: ", error);
          return null;
        }
      },
    }),
    Google,
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          if (user) {
            const existingUser = await findUserByEmail(user.email!);
            if (!existingUser) {
              const result = await createUser({
                firstName: user.name!.split(" ")[0],
                lastName: user.name!.split(" ")[1],
                email: user.email!,
                phone: null,
                address: "",
                password: "",
                role: "user",
                image: user.image!,
              });
            }
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return true;
    },
  },
});
