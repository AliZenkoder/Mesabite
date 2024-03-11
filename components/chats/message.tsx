import Image from "next/image";
import React from "react";

type Message = {
  senderImage: string | null;
  receiverImage: string | null;
  message: string;
  senderId: string;
  currentUserId: string;
};

const Message = ({ senderImage, receiverImage, message, senderId, currentUserId }: Message) => {

  const dummyProfile = "/dummy-profile-48.png";
  const profilePicture = (): string => {
    if (senderId !== currentUserId) {
      if (receiverImage !== null) {
        return receiverImage;
      } else {
        return dummyProfile;
      }
    } else {
      if (senderImage !== null) {
        return senderImage;
      } else {
        return dummyProfile;
      }
    }
  }

  return (
    <div className={`flex items-start gap-2 ${senderId === currentUserId ? "justify-start" : "flex-row-reverse justify-end ml-auto"}`}>
      <Image
        width={24}
        height={24}
        src={profilePicture()}
        alt="img"
      />
      <div className="p-1 bg-secondary-background rounded-md">
        <p className="text-secondary-text text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Message;
