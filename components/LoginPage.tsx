"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { ChromeIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { authenticate } from "@/lib/actions";
import { useActionState } from "react";

export default function LoginPage({ children }: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  // const handleLogin = async (e: any) => {
  //   // e?.preventDefault();
  //   console.log("login clicked");
  //   if (!email) setEmailError("Email is required");

  //   if (!password) setPasswordError("Password is required");

  // try {
  //   await signIn("credentials", {
  //     email: email,
  //     password: password,
  //   });
  //   console.log("login successfully");
  // } catch (error) {
  //   if (error instanceof AuthError) {
  //     switch (error.type) {
  //       case "CredentialsSignin":
  //         return "Invalid credentials.";
  //       default:
  //         return "Something went wrong.";
  //     }
  //   }
  //   throw error;
  // }
  // };
  return (
    <div className="flex-1 flex justify-center items-center py-28">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex justify-center">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={formAction}>
            <div className="space-y-2 mb-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Checkbox id="rememberMe" />
                <Label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm underline" prefetch={false}>
                Forgot password?
              </Link>
            </div>
            {errorMessage && (
              <div className="text-red-500 pt-4 text-center">
                {errorMessage}
              </div>
            )}
            <div className="mt-6 text-center ">
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-1 flex-col -mt-8">
          <div className="mt-4 text-center">
            <span className="text-muted-foreground">or sign in with</span>
            {children}
          </div>
          <div className="mt-4 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              SignUp
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
