"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChromeIcon } from "lucide-react";
import { registerUser, State } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useToast } from "./hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const initialState: State = { message: "", errors: {}, status: "" };
  const [state, formAction] = useActionState(registerUser, initialState);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    console.log("status: ", state.status);
    if (state.status) {
      toast({
        title: state.status,
        description: state.message || "message",
        variant: state.status === "Success" ? "default" : "destructive",
        duration: 2000,
      });
    } else {
      console.log("else message");
    }
  }, [state.status, state.message]);
  return (
    <div className="flex-1 flex justify-center items-center py-12">
      <form action={formAction}>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="John"
                />
                {state?.errors?.firstName && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.firstName}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                />
                {state?.errors?.lastName && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
              />
              {state?.errors?.email && (
                <span className="text-sm text-red-500">
                  {state?.errors?.email}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+1 (123) 456-7890"
              />
              {state?.errors?.phone && (
                <span className="text-sm text-red-500">
                  {state?.errors?.phone}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="123 Main St, Anytown USA"
              />
              {state?.errors?.address && (
                <span className="text-sm text-red-500">
                  {state?.errors?.address}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
              {state?.errors?.password && (
                <span className="text-sm text-red-500">
                  {state?.errors?.password}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
              />
            </div>
            <div className="mt-4 text-center">{state.message}</div>
            <div className="mt-4 text-center">
              <span className="text-muted-foreground">or sign up with</span>
              <Button variant="outline" className="w-full mt-2">
                <ChromeIcon className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <div className="mt-4 text-center">
              Already have an account? <Link href="/login">Login</Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
