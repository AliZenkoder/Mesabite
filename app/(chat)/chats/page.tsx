import React from "react";
import UsersList from "@/components/chats/users-list";

const Page = () => {
  return (
    <main className="flex flex-col gap-4 justify-center">
      <div className="text-3xl text-primary-text">
        Whoom you want chat with?
      </div>
      <UsersList />
    </main>
  );
};

export default Page;
