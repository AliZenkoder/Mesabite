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