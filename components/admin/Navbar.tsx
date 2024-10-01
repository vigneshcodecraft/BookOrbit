import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Book,
  BookAIcon,
  BookIcon,
  LogOut,
  User,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOut from "../SignOut";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { fetchUserDetails } from "@/lib/actions";
import Link from "next/link";

export default async function Navbar() {
  const currentUser = await fetchUserDetails();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 capitalize"></h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <AlertCircle className="h-4 w-4 mr-2" />
            Notifications
          </Button>
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
                <Link href="/admin/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="John Doe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profile">Profile</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </div>
    </header>
  );
}
