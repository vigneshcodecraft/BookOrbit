import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
