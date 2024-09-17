"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Users } from "lucide-react";

export default function SwitchPage() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <div
        className="flex"
        onClick={() =>
          pathname.startsWith("/admin")
            ? router.push("/dashboard")
            : router.push("/admin")
        }
      >
        <Users className="mr-2 h-4 w-4" />
        Switch
      </div>
    </>
  );
}
