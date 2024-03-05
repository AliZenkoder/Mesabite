"use client";
import {
  deleteFolderCategory,
  deleteMenuCategory,
  getAllFolderCategoryData,
  getAllMenuCategoryData,
} from "@/services/firestore-services";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchInput from "./search-input";

const FoldersList = () => {
  const [loading, setLoading] = useState(false);
  const [folderData, setFolderData] = useState<any[]>([]);
  const [copyFolderData, setCopyFolderData] = useState<any[]>([]);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [copyMenuData, setCopyMenuData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteFolder = (id: string) => {
    deleteFolderCategory(id).then((_value) =>
      setFolderData((prevState) => prevState.filter((f) => f?.id !== id))
    );
  };

  const handleDeleteMenu = (id: string) => {
    deleteMenuCategory(id).then((_value) =>
      setMenuData((prevState) => prevState.filter((f) => f?.id !== id))
    );
  };

  useEffect(() => {
    setLoading(true);
    getAllFolderCategoryData()
      .then((folderCategories) => {
        setFolderData(folderCategories);
        setCopyFolderData(folderCategories);
      })
      .catch((error) => console.error("List error: ", error));

    getAllMenuCategoryData()
      .then((menuCategories) => {
        setMenuData(menuCategories);
        setCopyMenuData(menuCategories);
      })
      .catch((error) => console.error("List error: ", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      setMenuData(
        copyMenuData?.filter((f) =>
          (f?.name as string).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setMenuData(copyMenuData);
    }
  }, [searchQuery]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  } else if (folderData?.length !== 0) {
    return (
      <div className="w-full flex flex-col gap-6">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {folderData.map((folder) => {
          return (
            <div
              key={folder?.id}
              className="
                            border-4
                            border-primary-text
                            rounded-lg
                            py-3
                            px-2
                            flex
                            flex-col
                            gap-3
                            h-full
                        "
            >
              {/* Folder Category info */}
              <div
                className="
                                flex
                                justify-between
                                gap-3
                                items-center
                            "
              >
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
                  <div>
                    <Image
                      width={28}
                      height={28}
                      src={"/primary-settings.png"}
                      alt="settings"
                    />
                  </div>
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
                .map((menu) => (
                  <div
                    key={menu?.id}
                    className={`
                        min-h-72
                        w-full
                        flex
                        flex-col
                        gap-2
                        justify-end
                        px-3
                        relative
                        border-2
                        border-primary-text
                        rounded-md
                    `}
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
                        <div>
                          <Image
                            width={28}
                            height={28}
                            src={"/secondary-settings.png"}
                            alt="settings"
                          />
                        </div>
                        <Link href={`/edit/cateogry/${menu?.id}`}>
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
                    <div className="text-xl text-white font-bold">
                      {menu?.name}
                    </div>
                    <div className="text-sm text-white overflow-x-hidden whitespace-nowrap text-ellipsis">
                      {menu?.description}
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default FoldersList;
