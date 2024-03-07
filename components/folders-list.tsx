"use client";
import {
  deleteFolderCategory,
  deleteMenuCategory,
  searchFromMenuCategories,
} from "@/services/firestore-services";
import React, { useEffect, useState } from "react";
import SearchInput from "@/components/search-input";
import toast from "react-hot-toast";
import {
  FetchFolderCategory,
  FetchMenuCategory,
  IFoldersList,
} from "@/interfaces";
import FolderItem from "@/components/folder-item";

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
        const getSearchResult = async () => {
          const searchResult = await searchFromMenuCategories(searchQuery);
          if (searchResult) {
            setMenuData(searchResult);
          }
          setSearhing(false);
        };
        getSearchResult();
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
            <FolderItem
              key={folder.id}
              folder={folder}
              menuData={menuData}
              handleDeleteFolder={handleDeleteFolder}
              handleDeleteMenu={handleDeleteMenu}
            />
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default FoldersList;
