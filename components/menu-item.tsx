import { FetchMenuCategory } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type MenuItem = {
  menu: FetchMenuCategory;
  handleDeleteMenu: (id: string) => void;
};

const MenuItem = ({ menu, handleDeleteMenu }: MenuItem) => {
  return (
    <div
      key={menu?.id}
      className={`min-h-72 w-full flex flex-col gap-2 justify-end px-3 relative border-2 border-primary-text rounded-md`}
    >
      <div className="absolute -z-10 left-0 top-0 w-full self-stretch">
        <img
          src={menu?.imageUrl}
          alt={menu?.name}
          className="object-cover w-full h-72 rounded-md"
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="bg-secondary-background rounded-full px-3 py-1 text-secondary-text text-sm">
          {menu?.items}&nbsp;ITEMS
        </div>
        <div className="flex gap-2 items-center">
          <Link href={`/edit-category/${menu?.id}`}>
            <Image
              width={28}
              height={28}
              src={"/secondary-settings.png"}
              alt="settings"
            />
          </Link>
          <Link href={`/edit-category/${menu?.id}`}>
            <Image
              width={28}
              height={28}
              src={"/secondary-edit.png"}
              alt="edit"
            />
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => handleDeleteMenu(menu?.id)}
          >
            <Image
              width={28}
              height={28}
              src={"/secondary-delete.png"}
              alt="delete"
            />
          </div>
        </div>
      </div>
      <div className="text-xl text-white font-bold">{menu?.name}</div>
      <div className="text-sm text-white overflow-x-hidden whitespace-nowrap text-ellipsis">
        {menu?.description}
      </div>
    </div>
  );
};

export default MenuItem;
