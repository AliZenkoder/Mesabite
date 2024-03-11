"use client";
import { ISideNav } from "@/interfaces";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import React from "react";

const SideNav: React.FC<ISideNav> = ({ isOpen, close }) => {
  return (
    <nav
      className={`
        fixed 
        w-56 
        h-full 
        top-0 
        bg-secondary-background 
        text-primary-text 
        text-base 
        px-4
        py-2
        transition-all
        duration-300
        border-r-2
        z-50
        border-primary-text
        ${isOpen ? "left-0" : "-left-56"}
    `}
    >
      <div className="w-full flex justify-end items-center">
        <IoIosClose
          className="text-3xl leading-none text-primary-text cursor-pointer"
          onClick={close}
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <Link href={"/"} onClick={close}>
          Home
        </Link>
        <Link href={"/chats"} onClick={close}>
          Chats
        </Link>
      </div>
    </nav>
  );
};

export default SideNav;
