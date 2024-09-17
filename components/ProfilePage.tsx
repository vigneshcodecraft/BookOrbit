"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PenSquare, User, Book, CheckCircle, Camera } from "lucide-react";
import { State, updateUserProfile } from "@/lib/actions";
import { useToast } from "./hooks/use-toast";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: number | null;
  image: string | undefined;
}

interface BookStats {
  totalBorrowed: number;
  totalReturned: number;
}

export default function ProfilePage({
  currentUser,
  bookStats,
}: {
  currentUser: UserProfile;
  bookStats: BookStats;
}) {
  const initialState: State = { message: "", errors: {}, status: "" };
  const [state, formAction, isPending] = useActionState(
    updateUserProfile,
    initialState
  );
  const { toast } = useToast();
  const router = useRouter();

  //   useEffect(() => {
  //     console.log("status: ", state.status);
  //     if (state.status) {
  //       toast({
  //         title: state.status,
  //         description: state.message || "message",
  //         variant: state.status === "Success" ? "success" : "destructive",
  //         duration: 2000,
  //       });
  //       router.back();
  //     }
  //   }, [state.status, state.message]);

  //   const [profile, setProfile] = useState<UserProfile>(currentUser);

  const [editMode, setEditMode] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form action
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log(formData);
    formAction(formData); // Call the form action to update the profile
    setEditMode(false); // Turn off edit mode after submission
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <Button
          onClick={() => setEditMode(!editMode)}
          variant={editMode ? "secondary" : "default"}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {editMode ? "Cancel" : "Edit Profile"}
          <PenSquare className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 shadow-md">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-gray-800">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Avatar className="w-32 h-32 border-4 border-gray-200">
                  <AvatarImage src={currentUser.image || undefined} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <User className="w-16 h-16" />
                  </AvatarFallback>
                </Avatar>
                {editMode && (
                  <div>
                    <Label htmlFor="profile-image" className="cursor-pointer">
                      <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                        <Camera className="w-4 h-4" />
                        <span>Change profile picture</span>
                      </div>
                    </Label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>

              <Separator className="bg-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="id"
                  name="id"
                  type="hidden"
                  value={currentUser?.id}
                />
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">
                    First Name
                  </Label>
                  {editMode ? (
                    <Input
                      id="firstName"
                      name="firstName"
                      defaultValue={currentUser.firstName}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-100 rounded-md text-gray-800">
                      {currentUser.firstName}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">
                    Last Name
                  </Label>
                  {editMode ? (
                    <Input
                      id="lastName"
                      name="lastName"
                      defaultValue={currentUser.lastName}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-100 rounded-md text-gray-800">
                      {currentUser.lastName}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="p-2 bg-gray-100 rounded-md text-gray-800">
                    {currentUser.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone Number
                  </Label>
                  {editMode ? (
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={currentUser.phone!}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-100 rounded-md text-gray-800">
                      {currentUser.phone}
                    </div>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-gray-700">
                    Address
                  </Label>
                  {editMode ? (
                    <Input
                      id="address"
                      name="address"
                      defaultValue={currentUser.address}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-100 rounded-md text-gray-800">
                      {currentUser.address}
                    </div>
                  )}
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-gray-800">Book Statistics</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Book className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Total Borrowed:
                  </span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {bookStats.totalBorrowed}
                </span>
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Total Returned:
                  </span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {bookStats.totalReturned}
                </span>
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Book className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Currently Borrowed:
                  </span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {bookStats.totalBorrowed - bookStats.totalReturned}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
