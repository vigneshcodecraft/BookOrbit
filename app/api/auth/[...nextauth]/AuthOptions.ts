// import type { NextAuthOptions, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { signToken } from "@/lib/authUtils";
// import { createUser, findUserByEmail } from "@/lib/actions";
// import * as bcrypt from "bcrypt";

// let UserAccount: User | null = null;

// export const AuthOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@email.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Enter Password",
//         },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             return null;
//           }

//           const [userExists] = await findUserByEmail(credentials.email);
//           const matchPassword = await bcrypt.compare(
//             credentials.password,
//             userExists.password
//           );

//           // If no user or If user exists but incorrect password, throw error
//           if (!userExists || !matchPassword)
//             throw new Error("Invalid Email or Password");

//           const userData = {
//             id: userExists.id,
//             firstName: userExists.firstName,
//             lastName: userExists.lastName,
//             email: userExists.email,
//             phone: userExists.phone,
//             role: userExists.role,
//             address: userExists.address,
//           };

//           const accessToken = signToken(userData);
//           UserAccount = { ...userData, accessToken };

//           return UserAccount;
//         } catch (err) {
//           console.log(err);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },
//     async jwt({ token, user, trigger, session }) {
//       if (user) {
//         const userData = {
//           id: user?.id,
//           firstName: user?.firstName,
//           lastName: user?.lastName,
//           email: user?.email,
//           phone: user?.phone,
//           role: user?.role,
//           address: user?.address,
//         };
//         const accessToken = signToken(userData);
//         token = { ...userData, accessToken };
//       } else if (trigger === "update") {
//         try {
//           const [userExists] = await findUserByEmail(token?.email!);

//           const userData = {
//             id: userExists?.id,
//             firstName: userExists?.firstName,
//             lastName: userExists?.lastName,
//             email: userExists?.email,
//             phone: userExists?.phone,
//             role: userExists?.role,
//             address: userExists?.address,
//           };

//           const accessToken = signToken(userData);
//           token = { ...userData, accessToken };
//         } catch (err) {
//           console.log("Update_Callback_Err", err);
//         }
//       }
//       return token;
//     },
//     // console.log("\nNewToken", token)
//     async session({ session, token }) {
//       if (token) {
//         session.user = token;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   // events: {
//   //     signIn(message) {
//   //         console.log("\nSignInEvent", message)
//   //     },
//   //     session(message) {
//   //         console.log("\nSessionEvent", message)
//   //     },
//   //     signOut(message) {
//   //         console.log("\nSignOutEvent", message)
//   //     },
//   // },
//   secret: process.env.ACCESS_TOKEN_SECRET,
//   // debug: process.env.NODE_ENV === "development",
// };
