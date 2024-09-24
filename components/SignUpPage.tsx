"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";
import { BookOpenIcon, ChromeIcon } from "lucide-react";
import { registerUser, State } from "@/lib/actions";
import { useActionState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

export default function SignUpPage() {
  const initialState: State = { message: "", errors: {}, status: "" };
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations("signUpPage");

  useEffect(() => {
    if (state.status) {
      toast({
        title: state.status,
        description: state.message || "message",
        variant: state.status === "Success" ? "default" : "destructive",
        duration: 2000,
      });
      if (state.status === "Success") {
        setTimeout(() => {
          router.push("/login"); // Redirect to login after successful signup
        }, 2000);
      }
    }
  }, [state.status, state.message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formAction(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-background-secondary p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="absolute right-8 top-8">
          <LocaleSwitcher />
        </div>
        <Card className="border-none shadow-lg bg-background-tertiary">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 bg-accent-primary rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <BookOpenIcon className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-text-primary">
              {t("header.title")}
            </CardTitle>
            <CardDescription className="text-text-secondary">
              {t("header.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-text-secondary"
                  >
                    {t("form.firstName")}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="bg-background"
                  />
                  {state?.errors?.firstName && (
                    <span className="text-sm text-red-500">
                      {state?.errors?.firstName}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-text-secondary"
                  >
                    {t("form.lastName")}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="bg-background"
                  />
                  {state?.errors?.lastName && (
                    <span className="text-sm text-red-500">
                      {state?.errors?.lastName}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-text-secondary"
                >
                  {t("form.email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-background"
                />
                {state?.errors?.email && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.email}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-text-secondary"
                >
                  {t("form.phone")}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                  className="bg-background"
                />
                {state?.errors?.phone && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.phone}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-text-secondary"
                >
                  {t("form.address")}
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="123 Main St, Anytown USA"
                  className="bg-background"
                />
                {state?.errors?.address && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.address}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-text-secondary"
                >
                  {t("form.password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="bg-background"
                />
                {state?.errors?.password && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.password}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-text-secondary"
                >
                  {t("form.confirmPassword")}
                </Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  className="bg-background"
                />
              </div>
              <Button
                className="w-full bg-accent-primary hover:bg-accent-hover text-white transition-colors duration-300 mt-4"
                type="submit"
                disabled={isPending}
              >
                {isPending ? t("form.signingUp") : t("form.signUp")}
              </Button>
              {state.message && (
                <div className="mt-4 text-center text-red-500">
                  {state.message}
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background-tertiary px-2 text-text-secondary">
                  {t("footer.signUpWith")}
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            <div className="text-center text-sm text-text-secondary">
              {t("footer.loginPrompt")}{" "}
              <Link
                href="/login"
                className="text-accent-primary hover:underline"
              >
                {t("footer.loginLink")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
