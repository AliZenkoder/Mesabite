import { FetchFolderCategory, FetchMenuCategory, IUser } from "@/interfaces";

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

export type AuthState = {
  isAuth: boolean;
  userId: string;
  name: string;
  imageUrl: string | null | undefined;
};

export type AuthInitialState = {
  value: AuthState;
  status: "idle" | "loading" | "failed";
};

export type UsersInitialState = {
  value: IUser[] | [];
};
