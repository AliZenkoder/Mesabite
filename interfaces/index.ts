export interface IFolderCategory {
  name: string;
  imageUrl?: string;
}

export interface IMenuCategory {
  name: string;
  description?: string;
  folderId: string;
  folderName: string;
  imageUrl?: string;
  items: number;
}

export interface IUser {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
  createdAt: Date;
  email: string;
}

export interface FetchFolderCategory extends IFolderCategory {
  id: string;
}

export interface FetchMenuCategory extends IMenuCategory {
  id: string;
}

export interface IFoldersList {
  folderCategories: FetchFolderCategory[];
  menuCategories: FetchMenuCategory[];
}

export interface IButtonProps {
  /**
   * This prop is for the styling of component
   */
  variant: "primary" | "secondary";
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  handleClick?: () => void;
  navigateLink?: string;
  children: React.ReactNode;
}

export interface ISearchInput {
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISideNav {
  isOpen: boolean;
  close: () => void;
}
