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
import { useTranslations } from "next-intl";

export default function LoginPage({ children }: any) {
  const t = useTranslations("loginPage");
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
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
          <CardTitle className="text-2xl flex justify-center">
            {t("header.title")}
          </CardTitle>
          <CardDescription>{t("header.description")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={formAction}>
            <div className="space-y-2 mb-2">
              <Label htmlFor="email">{t("form.emailLabel")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("form.emailPlaceholder")}
                required
              />
            </div>
            <div className="space-y-2 mb-2">
              <Label htmlFor="password">{t("form.passwordLabel")}</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Checkbox id="rememberMe" />
                <Label htmlFor="rememberMe" className="text-sm">
                  {t("form.rememberMe")}
                </Label>
              </div>
              <Link href="#" className="text-sm underline" prefetch={false}>
                {t("form.forgotPassword")}
              </Link>
            </div>
            {errorMessage && (
              <div className="text-red-500 pt-4 text-center">
                {errorMessage}
              </div>
            )}
            <div className="mt-6 text-center ">
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? t("form.loggingIn") : t("form.loginButton")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-1 flex-col -mt-8">
          <div className="mt-4 text-center">
            <span className="text-muted-foreground">
              {t("footer.signInWith")}
            </span>
            {children}
          </div>
          <div className="mt-4 text-center">
            {t("footer.signUpPrompt")}{" "}
            <Link href="/signup" className="underline">
              {t("footer.signUpLink")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
