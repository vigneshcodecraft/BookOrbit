"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { X, Search } from "lucide-react";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className={`max-w-sm transition-all duration-300 ${
          isSearchOpen
            ? "w-full sm:w-64 opacity-100"
            : "w-0 opacity-0 sm:w-64 sm:opacity-100"
        }`}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 sm:hidden"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        {isSearchOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
