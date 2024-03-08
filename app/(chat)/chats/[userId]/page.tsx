import React from "react";

interface ChatParams {
  userId: string;
}

interface IChatParams {
  params: ChatParams;
}

const Page: React.FC<IChatParams> = ({ params }) => {
  return <div>{params.userId}</div>;
};

export default Page;
