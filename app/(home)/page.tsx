import FoldersList from "@/components/folders-list";
import Loading from "@/components/loading";
import { FetchFolderCategory, FetchMenuCategory } from "@/interfaces";
import {
  getAllFolderCategoryData,
  getAllMenuCategoryData,
} from "@/services/firestore-services";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const Page = async () => {
  // data fetching
  const [folderCategories, menuCategories] = await Promise.all([
    getAllFolderCategoryData(),
    getAllMenuCategoryData(),
  ]);

  return (
    <main
      className="
            flex
            flex-col
            gap-6
            w-full
        "
    >
      <h1 className="text-primary-text font-extrabold text-4xl">YOUR MENU</h1>
      {/* search componenet */}
      <Link
        href={"/create-category-folder"}
        className="
                flex
                gap-4
                items-center
            "
      >
        <Image width={18} height={18} src="/add.png" alt="add" />
        <div
          className="
                    text-sm
                    font-bold
                    text-primary-text
                "
        >
          Create Cateogry Folder
        </div>
      </Link>
      <Suspense fallback={<Loading />}>
        <FoldersList
          folderCategories={folderCategories as FetchFolderCategory[]}
          menuCategories={menuCategories as FetchMenuCategory[]}
        />
      </Suspense>
      <Link
        href={"/create-category"}
        className="
                flex
                flex-col
                gap-8
                justify-center
                items-center
                min-h-72
                border-4
                border-primary-text
                skew-y-[2deg]
                skew-x-6
                uneven
                text-center
            "
      >
        <Image width={92} height={86} src="/add-lg.png" alt="add" />
        <div className="text-lg text-primary-text">
          ADD NEW CATEGORY
          <br />
          TO YOUR MENU
        </div>
      </Link>
    </main>
  );
};

export default Page;
