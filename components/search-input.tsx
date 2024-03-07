"use client";
import Image from "next/image";
import React from "react";

interface ISearchInput {
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<ISearchInput> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div
      className="
                relative
                w-full
                border-2
                border-primary-text
                skew-y-[-1deg]
                skew-x-12
                uneven
                px-2
                py-1
                flex
                gap-2
                items-center
            "
    >
      <Image width={14} height={14} src="/search.png" alt="search" />
      {/* <div className="text-sm text-primary-text">SEARCH MENU</div> */}
      <input
        type="text"
        className="
                    bg-transparent
                    w-full
                    focus-visible:outline-none
                    placeholder:text-primary-text
                "
        placeholder="SEARCH MENU"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery ? setSearchQuery(e.target.value) : () => {};
        }}
      />
    </div>
  );
};

export default SearchInput;
