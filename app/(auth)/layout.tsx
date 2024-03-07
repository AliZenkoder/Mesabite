import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full max-h-screen h-screen flex justify-center items-center p-[-24px] px-6">
      {children}
    </main>
  );
};

export default Layout;
