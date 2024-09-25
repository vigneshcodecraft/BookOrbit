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
import { BookOpenIcon, LockIcon, MailIcon } from "lucide-react";
import { motion } from "framer-motion";
import { authenticate } from "@/lib/actions";
import { useActionState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  const t = useTranslations("loginPage");
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <>
      <div className="absolute right-8 top-8">
        <LocaleSwitcher />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background-secondary bg-[#f0f4ff] p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="space-y-1 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-16 h-16 bg-[#3b82f6] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <BookOpenIcon className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-[#1e293b]">
                {t("header.title")}
              </CardTitle>
              <CardDescription className="text-[#64748b]">
                {t("header.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-[#1e293b]"
                  >
                    {t("form.emailLabel")}
                  </Label>
                  <div className="relative">
                    <MailIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-[#1e293b]"
                  >
                    {t("form.passwordLabel")}
                  </Label>
                  <div className="relative">
                    <LockIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm text-[#64748b]"
                    >
                      {t("form.rememberMe")}
                    </Label>
                  </div>
                  <Link
                    href="#"
                    className="text-sm text-[#3b82f6] hover:underline"
                  >
                    {t("form.forgotPassword")}
                  </Link>
                </div>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#ef4444] text-sm text-center"
                  >
                    {errorMessage}
                  </motion.div>
                )}
                <Button
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-colors duration-300"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? t("form.loggingIn") : t("form.loginButton")}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#e2e8f0]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#64748b]">
                    {t("footer.signInWith")}
                  </span>
                </div>
              </div>
              <div className="flex justify-center space-x-4">{children}</div>
              <div className="text-center text-sm text-[#64748b]">
                {t("footer.signUpPrompt")}{" "}
                <Link href="/signup" className="text-[#3b82f6] hover:underline">
                  {t("footer.signUpLink")}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
