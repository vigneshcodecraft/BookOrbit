"use client";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { addMember, State } from "@/lib/actions";
import { toast, useToast } from "../hooks/use-toast";
import { Textarea } from "../ui/textarea";

export default function Form() {
  const initialState: State = { message: "", errors: {}, status: "" };
  const [state, formAction, isPending] = useActionState(
    addMember,
    initialState
  );
  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setBookData((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleSelectChange = (value: string) => {
  //     setBookData((prev) => ({ ...prev, genre: value }));
  //   };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // Here you would typically send the data to your backend
  //     console.log("Submitting book data:", bookData);
  //     // After submission, navigate back to the books list
  //     router.push("/dashboard");
  //   };
  const toastMessage = () => {
    if (state.status === "Success" || state.status === "Error") {
      toast({
        title: state.status,
        description: state.message || "message",
        variant: state.status === "Success" ? "success" : "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Member</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">FirstName</Label>
                <Input id="firstName" name="firstName" type="text" required />
                {state?.errors?.firstName && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.firstName}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">LastName</Label>
                <Input id="lastName" name="lastName" type="text" required />
                {state?.errors?.lastName && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.lastName}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">email</Label>
                <Input id="email" name="email" type="email" required />
                {state?.errors?.email && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.email}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                {state?.errors?.password && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.password}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.role && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.role}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" required />
                {state?.errors?.phone && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.phone}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" required />
                {state?.errors?.address && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.address}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Link href="/admin/members">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending} onClick={toastMessage}>
                {isPending ? "Adding..." : "Add Member"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
