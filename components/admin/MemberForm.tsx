"use client";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { addMember, editMember, State, uploadImage } from "@/lib/actions";
import { toast, useToast } from "../hooks/use-toast";
import { IBook } from "@/lib/books/book.model";
import { IMember } from "@/lib/members/member.model";
import { Textarea } from "../ui/textarea";

interface MemberFormProps {
  member?: IMember;
  mode: "add" | "edit";
}

export default function MemberForm({ member, mode }: MemberFormProps) {
  const initialState: State = { message: "", errors: {}, status: "" };
  const action = mode === "add" ? addMember : editMember;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const result = await uploadImage(file);
      console.log("result", result);
      setIsUploading(false);
      if (result.imageURL) {
        setImageURL(result.imageURL);
      } else if (result.error) {
        console.error(result.error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formAction(formData);
  };
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
  // const toastMessage = () => {
  //   if (state.status === "Success" || state.status === "Error") {
  //     toast({
  //       title: state.status,
  //       description: state.message || "message",
  //       variant: state.status === "Success" ? "success" : "destructive",
  //       duration: 2000,
  //     });
  //   }
  // };
  useEffect(() => {
    console.log("status: ", state.status);
    if (state.status) {
      toast({
        title: state.status,
        description: state.message || "message",
        variant: state.status === "Success" ? "success" : "destructive",
        duration: 2000,
      });
      router.push("/admin/members");
    } else {
      console.log("else message");
    }
  }, [state.status, state.message]);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "add" ? "Add New Member" : "Edit Member"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mode === "edit" && (
                <Input id="id" name="id" type="hidden" value={member?.id} />
              )}
              <div className="space-y-2">
                <Label htmlFor="firstName">FirstName</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  defaultValue={member?.firstName}
                  required
                />
                {state?.errors?.firstName && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.firstName}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">LastName</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={member?.lastName}
                  type="text"
                  required
                />
                {state?.errors?.lastName && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.lastName}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">email</Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={member?.email}
                  type="email"
                  required
                />
                {state?.errors?.email && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.email}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  defaultValue=""
                  type="password"
                  required
                />
                {state?.errors?.password && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.password}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue={member?.role}>
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
                <Input
                  id="phone"
                  name="phone"
                  {...(member?.phone ? { defaultValue: member?.phone } : {})}
                  type="tel"
                  required
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
                  defaultValue={member?.address}
                  required
                />
                {state?.errors?.address && (
                  <span className="text-sm text-red-500">
                    {state?.errors?.address}
                  </span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  Book Cover Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {isUploading && <p>Uploading image...</p>}

                <input type="hidden" name="imageURL" value={imageURL} />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Link href="/admin/members">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? mode === "add"
                    ? "Adding"
                    : "Updating..."
                  : mode === "add"
                  ? "Add Member"
                  : "Update Member"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
