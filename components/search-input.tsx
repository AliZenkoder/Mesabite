"use client";
import { ISearchInput } from "@/interfaces";
import Image from "next/image";
import React from "react";

const SearchInput: React.FC<ISearchInput> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative w-full border-2 border-primary-text skew-x-6 uneven px-2 py-1 flex gap-2 items-center">
      <Image width={14} height={14} src="/search.png" alt="search" />
      <input
        type="text"
        className="bg-transparent w-full focus-visible:outline-none placeholder:text-primary-text"
        placeholder="SEARCH MENU (ex: Tajin)"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery ? setSearchQuery(e.target.value) : () => {};
        }}
      />
    </div>
  );
};

export default SearchInput;
