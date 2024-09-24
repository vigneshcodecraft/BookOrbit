import NavBar from "@/components/NavBar";
import SideNavBar from "@/components/SideNavBar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background text-text-primary">
      <SideNavBar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
