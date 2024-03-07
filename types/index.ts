import { FetchFolderCategory, FetchMenuCategory } from "@/interfaces";

export type FolderItem = {
    folder: FetchFolderCategory;
    handleDeleteFolder: (id: string) => void;
    handleDeleteMenu: (id: string) => void;
    menuData: FetchMenuCategory[] | [];
};

export type FormState = {
    name: string;
    description: string;
    imageUrl: string;
    folderId: string;
    items: number;
};

export type MenuItem = {
    menu: FetchMenuCategory;
    handleDeleteMenu: (id: string) => void;
  }; 