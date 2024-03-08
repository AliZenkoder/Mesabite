import React from "react";
import { TbLoader3 } from "react-icons/tb";

const LoadingScreen = () => {
  return (
    <div className="m-auto flex justify-center items-center text-center min-h-screen">
      <TbLoader3 className="text-primary-text text-8xl animate-spin" />
    </div>
  );
};

export default LoadingScreen;
