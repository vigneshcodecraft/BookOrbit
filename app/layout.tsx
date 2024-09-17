// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { cn } from "@/lib/utils";
import { inter } from "@/components/ui/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }: any) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
