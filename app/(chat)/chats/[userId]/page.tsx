import ChatBox from "@/components/chats/chat-box";
import React from "react";

interface ChatParams {
  userId: string;
}

interface IChatParams {
  params: ChatParams;
}

const Page: React.FC<IChatParams> = ({ params }) => {
  return (
    <main className="min-h-[calc(100vh-148px)]">
      <ChatBox id={params.userId} />
    </main>
  );
};

export default Page;
