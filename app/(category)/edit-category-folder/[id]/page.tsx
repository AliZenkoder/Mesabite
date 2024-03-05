import Button from "@/components/button";
import Form from "@/components/form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    // min height provided for action button
    <main
      className="
            flex
            flex-col
            gap-4
            w-full
            min-h-screen
        "
    >
      {/* heading div */}
      <div
        className="
                flex
                gap-4
                justify-between
                items-center
            "
      >
        <div className="text-xl text-primary-text font-bold">
          Edit Category Folder
        </div>
        <Link href={"/"}>
          <Image width={21} height={21} src="/cross.png" alt="close" />
        </Link>
      </div>
      {/* description div */}
      <div
        className="
                w-10/12
                text-sm
                text-secondary-text                
                text-center
                mx-auto
            "
      >
        Here you can create Category Folder that
        <br />
        <span className="font-bold">includes other categories under it.</span>
      </div>
      <Form isFolder={true} isEdit id={params.id} />
    </main>
  );
};

export default Page;
