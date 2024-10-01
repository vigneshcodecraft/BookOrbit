import { BookOpen, LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import NavContent from "@/components/NavContent";
import SearchBar from "@/components/SearchBar";
import SignOut from "./SignOut";
import { fetchUserDetails } from "@/lib/actions";
import Link from "next/link";

export default async function Navbar() {
  const currentUser = await fetchUserDetails();
  return (
    <header className="bg-white shadow-sm border-b border-[#e2e8f0]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold">Menu</h2>
              </div>
              <ScrollArea className="flex-1 px-3 py-2">
                <NavContent />
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <div className="flex items-center ml-2">
            <BookOpen className="h-8 w-8 text-[#3b82f6] sm:hidden" />
            <h1 className="text-2xl font-bold text-[#3b82f6] ml-2 hidden sm:inline lg:hidden">
              BookOrbit
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar placeholder="Search books..." />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser?.image} alt="@username" />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <p className="text-xs leading-none text-[#64748b]">
                    {currentUser?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
