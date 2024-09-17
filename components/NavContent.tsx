"use client";
import {
  AlertCircle,
  BookOpen,
  BookPlus,
  Home,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavContentProps {
  isSidebarExpanded?: boolean;
}

export default function NavContent({
  isSidebarExpanded = true,
}: NavContentProps) {
  const pathname = usePathname(); // Get the current path
  const links = [
    {
      icon: <LayoutDashboard className="mr-3 h-6 w-6" />,
      label: "Dashboard",
      href: "/dashboard/",
    },
    {
      icon: <BookOpen className="mr-3 h-6 w-6" />,
      label: "All Books",
      href: "/dashboard/books",
    },
    {
      icon: <BookPlus className="mr-3 h-6 w-6" />,
      label: "My Books",
      href: "/dashboard/myBooks",
    },
    {
      icon: <AlertCircle className="mr-3 h-6 w-6" />,
      label: "My Requests",
      href: "/dashboard/myRequests",
    },
  ];
  return (
    <nav className="space-y-1">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <div
            className={clsx(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md",
              {
                "bg-gray-100 text-gray-900": pathname === link.href,
                "text-gray-600 hover:bg-gray-50 hover:text-gray-900":
                  pathname !== link.href,
              }
            )}
          >
            {link.icon}
            <span className={clsx("ml-3", { hidden: !isSidebarExpanded })}>
              {link.label}
            </span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
