"use client";
import {
  AlertCircle,
  BookOpen,
  BookPlus,
  Calendar,
  LayoutDashboard,
  User,
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
  const pathname = usePathname();
  const links = [
    {
      icon: <BookOpen className="mr-2 h-6 w-6" />,
      label: "All Books",
      href: "/dashboard/books",
    },
    {
      icon: <BookPlus className="mr-2 h-6 w-6" />,
      label: "My Books",
      href: "/dashboard/myBooks",
    },
    {
      icon: <AlertCircle className="mr-2 h-6 w-6" />,
      label: "My Requests",
      href: "/dashboard/myRequests",
    },
    {
      icon: <User className="mr-2 h-6 w-6" />,
      label: "Professors",
      href: "/dashboard/professors",
    },
    {
      icon: <Calendar className="mr-2 h-6 w-6" />,
      label: "My Appointments",
      href: "/dashboard/appointments",
    },
  ];
  return (
    <nav className="space-y-1">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <div
            className={clsx(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              {
                "bg-[#3b82f6] text-white": pathname === link.href,
                "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e293b]":
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
