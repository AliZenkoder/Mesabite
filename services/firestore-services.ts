import { IFolderCategory, IMenuCategory } from "@/interfaces";
import { auth, db } from "@/utils/firebase-config";
import { setCookie } from "cookies-next";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// Collections
export const menuCategoryCollection = collection(db, "menuCategories");
export const folderCategoryCollection = collection(db, "folderCategories");
export const usersCollection = collection(db, "users");

// CRUD functions for menu cateogory
export const addMenuCategory = async (data: IMenuCategory) => {
  return await addDoc(menuCategoryCollection, { ...data });
};

export const getAllMenuCategoryData = async () => {
  const categorySnapShot = await getDocs(menuCategoryCollection);
  const categories = categorySnapShot.docs.map((cateogry) => ({
    ...cateogry.data(),
    id: cateogry.id,
  }));
  return categories;
};

export const getMenuCategoryData = async (id: string) => {
  const menuCategoryRef = doc(db, "menuCategories", id);
  const menuCategorySnapShot = await getDoc(menuCategoryRef);
  const menuCategoryData = menuCategorySnapShot?.data();
  return menuCategoryData;
};

export const deleteMenuCategory = async (id: string) => {
  const deleteField = doc(db, "menuCategories", id);
  const isDeleted = await deleteDoc(deleteField);
  return isDeleted;
};

export const updateMenuCategory = async (id: string, data: IMenuCategory) => {
  const updateField = doc(db, "menuCategories", id);
  const isUpdated = await updateDoc(updateField, { ...data });
  return isUpdated;
};

// CRUD functions for folder cateogory
export const addFolderCategory = async (data: IFolderCategory) => {
  return await addDoc(folderCategoryCollection, { ...data });
};

export const getAllFolderCategoryData = async () => {
  const categorySnapShot = await getDocs(folderCategoryCollection);
  const categories = categorySnapShot.docs.map((cateogry) => ({
    ...cateogry.data(),
    id: cateogry.id,
  }));
  return categories;
};

export const getFolderCategoryData = async (id: string) => {
  const folderCategoryRef = doc(db, "folderCategories", id);
  const folderCategorySnapShot = await getDoc(folderCategoryRef);
  const folderCategoryData = folderCategorySnapShot.exists()
    ? folderCategorySnapShot.data()
    : null;
  return folderCategoryData;
};

export const deleteFolderCategory = async (id: string) => {
  const deleteField = doc(db, "folderCategories", id);
  const isDeleted = await deleteDoc(deleteField);
  return isDeleted;
};

export const updateFolderCategory = async (
  id: string,
  data: IFolderCategory
) => {
  const updateField = doc(db, "folderCategories", id);
  const isUpdated = await updateDoc(updateField, { ...data });
  return isUpdated;
};

// Search Query functions
export const searchFromMenuCategories = async (name: string) => {
  const searchQuery = query(menuCategoryCollection, where("name", "==", name));
  const menuCategoriesSnapShot = await getDocs(searchQuery);
  const menuCategories = menuCategoriesSnapShot.docs.map((category) => ({
    ...category.data(),
    id: category.id,
  }));
  return menuCategories;
};

// Auth functions
export const createUser = async (email: string, password: string) => {
  try {
    const isUserCreated = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (isUserCreated?.user?.uid) {
      await setDoc(doc(db, "users", isUserCreated.user?.uid), {
        name:
          isUserCreated.user?.displayName ||
          isUserCreated.user.email?.split("@")[0] ||
          "Anonymous",
        imageUrl: isUserCreated.user?.photoURL,
        email: isUserCreated.user.email,
        createdAt: new Date(),
      });
      return isUserCreated;
    }
  } catch (error) {
    console.error("error: ", error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const isSignIn = await signInWithEmailAndPassword(auth, email, password);
    if (isSignIn) {
      setCookie("isAuth", true);
      return isSignIn;
    }
  } catch (error) {
    console.error("error: ", error);
  }
};
