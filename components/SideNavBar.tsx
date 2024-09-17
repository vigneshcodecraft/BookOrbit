"use client";
import { useState } from "react";
import {
  Home,
  BookOpen,
  BookPlus,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
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
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          {isSidebarExpanded && (
            <h1 className="text-2xl font-bold text-primary">BookOrbit</h1>
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
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="h-5 w-5 mr-2" />
            {isSidebarExpanded && "Logout"}
          </Button>
        </div>
      </aside>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import {
//   BookOpen,
//   Home,
//   User,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   BookPlus,
//   Menu,
//   Building,
//   Hash,
//   Tag,
//   Bookmark,
//   Book,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { signOut } from "next-auth/react";
// import clsx from "clsx";

// export default function SideNavBar() {
//   function handleLogout() {
//     signOut({ callbackUrl: "/login" });
//   }
//   const toggleSidebar = () => {
//     setIsSidebarExpanded(!isSidebarExpanded);
//   };
//   const [activeTab, setActiveTab] = useState("home");
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
//   return (
//     <aside
//       className={clsx(
//         "bg-white shadow-md transition-all duration-300",
//         isSidebarExpanded ? "w-64" : "w-16"
//       )}
//     >
//       <div className="p-4 flex justify-between items-center">
//         {isSidebarExpanded && (
//           <h1 className="text-2xl font-bold text-gray-800">Library</h1>
//         )}
//         <Button variant="ghost" size="icon" onClick={toggleSidebar}>
//           {isSidebarExpanded ? (
//             <ChevronLeft className="h-4 w-4" />
//           ) : (
//             <ChevronRight className="h-4 w-4" />
//           )}
//         </Button>
//       </div>
//       <nav className="mt-6">
//         <Link href="/dashboard/books/displayBook">
//           <Button
//             variant={activeTab === "home" ? "secondary" : "ghost"}
//             className={`w-full justify-start ${
//               !isSidebarExpanded && "justify-center"
//             }`}
//             onClick={() => {
//               setActiveTab("home");
//             }}
//           >
//             <Home className="h-4 w-4" />
//             {isSidebarExpanded && <span className="ml-2">Dashboard</span>}
//           </Button>
//         </Link>
//         <Link href="/dashboard/books/displayBook">
//           <Button
//             variant={activeTab === "all-books" ? "secondary" : "ghost"}
//             className={`w-full justify-start ${
//               !isSidebarExpanded && "justify-center"
//             }`}
//             onClick={() => setActiveTab("all-books")}
//           >
//             <BookOpen className="h-4 w-4" />
//             {isSidebarExpanded && <span className="ml-2">All Books</span>}
//           </Button>
//         </Link>
//         <Link href="/dashboard/books/displayBook">
//           <Button
//             variant={activeTab === "my-books" ? "secondary" : "ghost"}
//             className={`w-full justify-start ${
//               !isSidebarExpanded && "justify-center"
//             }`}
//             onClick={() => setActiveTab("my-books")}
//           >
//             <BookPlus className="h-4 w-4" />
//             {isSidebarExpanded && <span className="ml-2">My Books</span>}
//           </Button>
//         </Link>
//       </nav>
//       <div
//         className={`absolute bottom-4 ${
//           isSidebarExpanded ? "left-4" : "left-2"
//         }`}
//       >
//         <Button
//           variant="destructive"
//           size={isSidebarExpanded ? "default" : "icon"}
//           onClick={handleLogout}
//         >
//           <LogOut className="h-4 w-4" />
//           {isSidebarExpanded && <span className="ml-2">Logout</span>}
//         </Button>
//       </div>
//     </aside>
//   );
// }
