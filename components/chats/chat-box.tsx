"use client";

import { getLoginUser } from "@/redux/features/auth/auth-slice";
import { useAppSelector } from "@/redux/store";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import * as Yup from "yup";
import Message from "@/components/chats/message";
import { getAllUsers } from "@/redux/features/users/users-slice";
import Loading from "../loading";
import { createConversation, getUserData, sendMessage } from "@/services/firestore-services";
import { IUser } from "@/interfaces";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase-config";

type ChatBox = {
  id: string;
};

const ChatBox = ({ id }: ChatBox) => {
  const router = useRouter();
  const user = useAppSelector(getLoginUser);
  const allUsers = useAppSelector(getAllUsers);
  const [loading, setLoading] = useState(true);
  const [isMount, setIsMount] = useState(false);
  const [receiverUser, setReceiverUser] = useState<IUser | any>({});
  const [currentConversationId, setCurrentConversationId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const handleSubmit = async (message: string) => {
    const isMessageSend = await sendMessage(currentConversationId, message, user.userId);
    if (isMessageSend !== null) {
      formik.resetForm();
    } else {
      toast.error("Something went wrong");
    }
  }

  const validationSchema = Yup.object().shape({
    message: Yup.string().max(256, "Only 256 characters are allowed"),
  });
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values.message);
    },
  });

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    createConversation(user.userId, id).then((value) =>
      {
        if (value !== null) {
          setCurrentConversationId(value);
        } else {
          toast.error("Something went wrong");
          router.push("/chats");
        }
        console.log("value: ", value)
      }
    )
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getReceiverUser = async () => {
      const userData = await getUserData(id);

      if (receiverUser) {
        setReceiverUser(userData as IUser);
      } else {
        // do nothing
      }
    }

    getReceiverUser();
  }, []);

  useEffect(() => {
    if (currentConversationId !== "") {
      const conversationRef = doc(db, "conversations", currentConversationId);
      const messagesRef = collection(conversationRef, "messages");
      const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"))

      const unsub = onSnapshot(
        messagesQuery, // Order by createdAt descending
        (snapshot) => {
          const conversationMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (conversationMessages?.length > 0) {
            setMessages(conversationMessages);
          }
          // Now includes documents ordered by createdAt (descending)
        }
      );
  
      return () => unsub();
    }
  }, [currentConversationId])
  

  if (!isMount) return null;
  else if (loading) return <Loading />;

  return (
    <div className="flex flex-col divide-y-2 border-2 border-primary-text rounded-md divide-primary-text w-full h-full">
      {/* info section */}
      <div className="flex items-center">
        <Link
          href={"/chats"}
          className="px-3 py-4 transition-colors duration-300 hover:bg-white/40 rounded-s-md"
        >
          <IoMdArrowBack className="text-2xl text-primary-text" />
        </Link>
        <div className="px-3 flex gap-3 items-center text-xl text-primary-text">
          <Image
            width={36}
            height={36}
            src={user.imageUrl ? user.imageUrl : "/dummy-profile-48.png"}
            alt="img"
          />
          <div>{receiverUser?.name}</div>
        </div>
      </div>
      {/* messages and form */}
      <div className="flex flex-col w-full bg-slate-100 h-[calc(100vh-208px)] rounded-bl-md rounded-br-md">
        <div className={"flex flex-col gap-1 w-full p-2 overflow-y-auto"}>
          {messages?.length > 0 ? (
            messages.map((message) => (
              <Message senderImage={user.imageUrl as(string | null)} receiverImage={receiverUser.imageUrl} message={message?.content} key={message?.id} currentUserId={user.userId} senderId={message?.userId}/>
            ))
          ) : (
            <div>Start Conversation</div>
          )}
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-auto flex items-stretch"
        >
          <input
            className="w-full bg-white px-3 py-1 focus-visible:outline-none flex-grow rounded-bl-md"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            className="outline-none px-3 py-1 bg-primary-background rounded-br-md text-sm disabled:opacity-60"
            disabled={currentConversationId === "" || formik.values.message === ""}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
