"use client";
import {
  deleteFolderCategory,
  deleteMenuCategory,
  searchFromMenuCategories,
} from "@/services/firestore-services";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchInput from "./search-input";
import toast from "react-hot-toast";
import {
  FetchFolderCategory,
  FetchMenuCategory,
  IFoldersList,
} from "@/interfaces";

const FoldersList: React.FC<IFoldersList> = ({
  folderCategories,
  menuCategories,
}) => {
  const [searching, setSearhing] = useState(false);
  const [folderData, setFolderData] = useState<FetchFolderCategory[] | any[]>(
    folderCategories || []
  );
  const [copyFolderData, setCopyFolderData] = useState<
    FetchFolderCategory[] | any[]
  >(folderCategories || []);
  const [menuData, setMenuData] = useState<FetchMenuCategory[] | any[]>(
    menuCategories || []
  );
  const [copyMenuData, setCopyMenuData] = useState<FetchMenuCategory[] | any[]>(
    menuCategories || []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteFolder = (id: string) => {
    let userConfirmation = confirm(
      "Are you sure you want to delete this folder category?"
    );
    if (userConfirmation) {
      deleteFolderCategory(id).then((_value) => {
        setFolderData((prevState) => prevState.filter((f) => f?.id !== id));
        toast.success("Folder Category Deleted", {
          position: "bottom-center",
        });
      });
    }
  };

  const handleDeleteMenu = (id: string) => {
    let userConfirmation = confirm(
      "Are you sure you want to delete this menu category?"
    );
    if (userConfirmation) {
      deleteMenuCategory(id).then((_value) => {
        setMenuData((prevState) => prevState.filter((f) => f?.id !== id));
        toast.success("Menu Category Deleted", {
          position: "bottom-center",
        });
      });
    }
  };

  useEffect(() => {
    setFolderData(folderCategories);
    setCopyFolderData(folderCategories);
    setMenuData(menuCategories);
    setCopyMenuData(menuCategories);
  }, [folderCategories, menuCategories]);

  useEffect(() => {
    if (searchQuery !== "") {
      // filter search
      // setMenuData(
      //   copyMenuData?.filter((f) =>
      //     (f?.name as string).toLowerCase().includes(searchQuery.toLowerCase())
      //   )
      // );

      // fire store search
      const getSearchData = setTimeout(() => {
        setSearhing(true);
        searchFromMenuCategories(searchQuery)
          .then((values) => {
            setMenuData(values);
            // console.log(values)
          })
          .finally(() => setSearhing(false));
      }, 750);

      return () => clearTimeout(getSearchData);
    } else {
      setMenuData(copyMenuData);
    }
  }, [searchQuery]);

  if (folderData?.length !== 0) {
    return (
      <div className="w-full flex flex-col gap-6">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {searching ? (
          <div className="text-lg text-primary-text">
            Searching your menu...
          </div>
        ) : null}
        {folderData.map((folder: FetchFolderCategory) => {
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
                .map((menu: FetchMenuCategory) => (
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
