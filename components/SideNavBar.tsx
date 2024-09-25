"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavContent from "@/components/NavContent";

export default function SideNavbar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      <aside
        className={`hidden lg:flex bg-white shadow-lg flex-col h-full transition-all duration-300 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-[#e2e8f0]">
          {isSidebarExpanded && (
            <h1 className="text-2xl font-bold text-[#3b82f6]">BookOrbit</h1>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3 py-2">
          <NavContent isSidebarExpanded={isSidebarExpanded} />
        </ScrollArea>
        <div className="p-4 border-t border-[#e2e8f0]">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="h-5 w-5 mr-2" />
            {isSidebarExpanded && "Logout"}
          </Button>
        </div>
      </aside>
    </div>
  );
}
