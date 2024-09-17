// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User, LogOut, Menu } from "lucide-react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import Search from "./Search";
// import { fetchUserDetails } from "@/lib/actions";

// export default async function NavBar() {
//   const userDetails = await fetchUserDetails();
//   return (
//     <>
//       <header className="bg-white shadow-sm ">
//         <div className="flex items-center justify-between p-4">
//           {/* <Button variant="ghost" size="icon" className="lg:hidden">
//             <Menu className="h-5 w-5" />
//           </Button> */}
//           <div className="flex-1 px-4">
//             <Search placeholder="Search books" />
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={userDetails?.image} alt="@username" />
//                   <AvatarFallback>U</AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">
//                     {userDetails?.firstName} {userDetails?.lastName}
//                   </p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     {userDetails?.email}
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>
//     </>
//   );
// }

import { BookOpen, LogOut, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
import SwitchPage from "./SwitchPage";
import Link from "next/link";

export default async function Navbar() {
  const currentUser = await fetchUserDetails();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Menu</h2>
              </div>
              <ScrollArea className="flex-1 px-3 py-2">
                <NavContent />
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <div className="flex items-center ml-2">
            <BookOpen className="h-8 w-8 text-primary sm:hidden" />
            <h1 className="text-2xl font-bold text-primary ml-2 hidden sm:inline lg:hidden">
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
                  <p className="text-xs leading-none text-muted-foreground">
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
                <LogOut className="mr-2 h-4 w-4" />
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
