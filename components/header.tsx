"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "@/components/button";
import { logOut } from "@/redux/features/auth-slice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMount, setIsMount] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.value);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {}, [pathname, user]);

  if (
    user?.userId === "" &&
    isMount &&
    (pathname === "/sign-in" || pathname === "/sign-up")
  )
    return null;
  else if (isMount && user?.userId !== "")
    return (
      <header
        className="
            bg-secondary-background
            px-8
            py-6
            flex
            justify-between
            items-center
            border-b-2
            border-primary-text
        "
      >
        <div className="flex gap-2 items-center">
          <Image width={20} height={14} src="/hamburger.png" alt="menu" />
          <div className="text-lg text-primary-text">
            {user ? user?.name : ""}
          </div>
        </div>
        <div
          className="
                flex
                gap-2
                items-center
            "
        >
          <Image width={30} height={30} src="/profile.png" alt="profile" />
          {/* <Image width={15} height={9} src="/chevron-down.png" alt="arrow" /> */}
          <Button
            variant="secondary"
            handleClick={() => {
              dispatch(logOut());
              router.refresh();
            }}
          >
            Sign Out
          </Button>
        </div>
      </header>
    );
  else return null;
};

export default Header;
