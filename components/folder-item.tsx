import { FetchFolderCategory, FetchMenuCategory } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MenuItem from "@/components/menu-item";

type FolderItem = {
  folder: FetchFolderCategory;
  handleDeleteFolder: (id: string) => void;
  handleDeleteMenu: (id: string) => void;
  menuData: FetchMenuCategory[] | [];
};

const FolderItem = ({
  folder,
  handleDeleteFolder,
  handleDeleteMenu,
  menuData,
}: FolderItem) => {
  return (
    <div
      key={folder?.id}
      className=" border-4 border-primary-text rounded-lg py-3 px-2 flex flex-col gap-3 h-full"
    >
      {/* Folder Category info */}
      <div className=" flex justify-between gap-3 items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={"/solid-hamburger.png"}
            alt="menu"
            width={19}
            height={10}
          />
          <div className="text-xl text-primary-text font-bold">
            {folder?.name}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Link href={`/edit-category-folder/${folder?.id}`}>
            <Image
              width={28}
              height={28}
              src={"/primary-settings.png"}
              alt="settings"
            />
          </Link>
          <Link href={`/edit-category-folder/${folder?.id}`}>
            <Image
              width={28}
              height={28}
              src={"/primary-edit.png"}
              alt="edit"
            />
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => handleDeleteFolder(folder?.id)}
          >
            <Image
              width={28}
              height={28}
              src={"/primary-delete.png"}
              alt="delete"
            />
          </div>
        </div>
      </div>

      {menuData
        ?.filter((menu) => menu?.folderName === folder?.name)
        .map((menu: FetchMenuCategory) => (
          <MenuItem
            key={menu?.id}
            menu={menu}
            handleDeleteMenu={handleDeleteMenu}
          />
        ))}
    </div>
  );
};

export default FolderItem;
