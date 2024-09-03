"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
/**
 * Search component for handling search functionality.
 * @param placeholder - The placeholder text for the search input field.
 */
const Search = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    /**
     * Delayed debounce function to handle search input changes.
     */
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image
        src={"/assets/icons/search.svg"}
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
      />
    </div>
  );
};

export default Search;
