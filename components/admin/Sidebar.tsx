"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  RepeatIcon,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      value: "",
    },
    { icon: <BookOpen className="h-5 w-5" />, label: "Books", value: "books" },
    { icon: <Users className="h-5 w-5" />, label: "Members", value: "members" },
    {
      icon: <RepeatIcon className="h-5 w-5" />,
      label: "Transactions",
      value: "transactions",
    },
    {
      icon: <AlertCircle className="h-5 w-5" />,
      label: "Requests",
      value: "requests",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Professors",
      value: "professors",
    },
    // {
    //   icon: <Clock className="h-5 w-5" />,
    //   label: "Due Today",
    //   value: "dueToday",
    // },
    // { icon: <Clock className="h-5 w-5" />, label: "Overdue", value: "overdue" },
  ];
  const [activeTab, setActiveTab] = useState("dashboard");
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <aside
      className={`bg-white ${
        isSidebarCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isSidebarCollapsed && (
          <h2 className="text-xl font-semibold">BookOrbit</h2>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="p-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.value}
            variant={
              pathname === `admin/${item.value}` ? "destructive" : "ghost"
            }
            className={`w-full justify-start mb-1 ${
              isSidebarCollapsed ? "px-2" : "px-4"
            }`}
            onClick={() => router.push(`/admin/${item.value}`)}
          >
            {item.icon}
            {!isSidebarCollapsed && <span className="ml-2">{item.label}</span>}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
