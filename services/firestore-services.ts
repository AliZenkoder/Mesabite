import { db } from "@/utils/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

// Collections
export const menuCategoryCollection = collection(db, "menuCategories");
export const folderCategoryCollection = collection(db, "folderCategories");

interface IFolderCategory {
  name: string;
  imageUrl?: string;
}

interface IMenuCategory {
  name: string;
  description?: string;
  folderId: string;
  folderName: string;
  imageUrl?: string;
  items: number;
}

// CRUD functions for menu cateogory
export const addMenuCategory = async (data: IMenuCategory) => {
  return await addDoc(menuCategoryCollection, { ...data });
}

export const getAllMenuCategoryData = async () => {
  const categorySnapShot = await getDocs(menuCategoryCollection);
  const categories = categorySnapShot.docs.map((cateogry) => ({ ...cateogry.data(), id: cateogry.id}));
  return categories;
}

export const getMenuCategoryData = async (id: string) => {
  const menuCategoryRef = doc(db, "menuCategories", id);
  const menuCategorySnapShot = await getDoc(menuCategoryRef);
  const menuCategoryData = menuCategorySnapShot?.data();
  return menuCategoryData;
}

export const deleteMenuCategory = async (id: string) => {
  const deleteField = doc(db, "menuCategories", id);
  const isDeleted = await deleteDoc(deleteField);
  return isDeleted;
}

export const updateMenuCategory = async (id: string, data: IMenuCategory) => {
  const updateField = doc(db, "menuCategories", id);
  const isUpdated = await updateDoc(updateField, { ...data });
  return isUpdated;
}

// CRUD functions for folder cateogory
export const addFolderCategory = async (data: IFolderCategory) => {
  return await addDoc(folderCategoryCollection, { ...data });
}

export const getAllFolderCategoryData = async () => {
  const categorySnapShot = await getDocs(folderCategoryCollection);
  const categories = categorySnapShot.docs.map((cateogry) => ({ ...cateogry.data(), id: cateogry.id}));
  return categories;
}

export const getFolderCategoryData = async (id: string) => {
  const folderCategoryRef = doc(db, "folderCategories", id);
  const folderCategorySnapShot = await getDoc(folderCategoryRef);
  const folderCategoryData = folderCategorySnapShot?.data();
  return folderCategoryData;
}

export const deleteFolderCategory = async (id: string) => {
  const deleteField = doc(db, "folderCategories", id);
  const isDeleted = await deleteDoc(deleteField);
  return isDeleted;
}

export const updateFolderCategory = async (id: string, data: IFolderCategory) => {
  const updateField = doc(db, "folderCategories", id);
  const isUpdated = await updateDoc(updateField, { ...data });
  return isUpdated;
}