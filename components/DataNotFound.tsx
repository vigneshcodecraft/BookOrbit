"use client";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Plus, Backpack, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DataNotFoundProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  path?: string;
  icon?: any;
}

export default function DataNotFound({
  title,
  message,
  actionLabel,
  path,
  icon,
}: DataNotFoundProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>
        <div className="mt-8 space-y-6">
          {actionLabel && (
            <Button
              onClick={() => {
                path ? router.push(path) : router.back();
              }}
            >
              {icon ? icon : <Undo2 className="mr-2 h-4 w-4" />}
              {actionLabel}
            </Button>
          )}
          {/* {showRefresh && (
            <Button variant="outline" onClick={onRefresh} className="w-full">
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
}
