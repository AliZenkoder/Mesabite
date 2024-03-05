import Image from "next/image";
import React from "react";

const Header = () => {
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
      <Image width={20} height={14} src="/hamburger.png" alt="menu" />
      <div
        className="
                flex
                gap-2
                items-center
            "
      >
        <Image width={30} height={30} src="/profile.png" alt="profile" />
        <Image width={15} height={9} src="/chevron-down.png" alt="arrow" />
      </div>
    </header>
  );
};

export default Header;
