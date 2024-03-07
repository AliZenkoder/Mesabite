"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { IButtonProps } from "@/interfaces";

const Button: FC<IButtonProps> = ({
  variant,
  disabled,
  type,
  handleClick,
  navigateLink,
  children,
}) => {
  const router = useRouter();
  return (
    <button
      className={`
            rounded-2xl
            px-8
            py-3
            ${
              variant === "primary"
                ? "bg-secondary-background text-primary-text disabled:bg-secondary-background/55"
                : "bg-primary-text text-white disabled:bg-primary-text/55"
            }
        `}
      onClick={
        navigateLink
          ? () => router.push(navigateLink)
          : handleClick
          ? handleClick
          : () => {}
      }
      disabled={disabled ? disabled : false}
      type={type ? type : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
