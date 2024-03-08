"use client";
import { IUser } from "@/interfaces";
import { db } from "@/utils/firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading";

const Userslist = () => {
  const [users, setUsers] = useState<any[]>([]); // State to store user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "users"), orderBy("createdAt", "desc")), // Order by createdAt descending
      (snapshot) => {
        const userDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userDocs);
        setLoading(false);
        console.log(userDocs); // Now includes documents ordered by createdAt (descending)
      }
    );

    return () => unsub();
  }, []);

  if (loading) return <Loading />;

  return (
    <div
      className="
      flex 
      flex-col 
      divide-y 
      divide-primary-text 
      rounded-md 
      border-2 
      border-primary-text 
      w-full
    "
    >
      {users.map((user: IUser) => (
        <Link
          href={`/chats/${user.id}`}
          key={user.id}
          className="
            px-3
            py-4
            transition-colors
            duration-300
            hover:bg-white/40
            flex
            justify-start
            items-start
            gap-3
          "
        >
          <div>
            <Image
              width={42}
              height={42}
              src={user.imageUrl ? user.imageUrl : "/dummy-profile-48.png"}
              alt="user-img"
            />
          </div>
          <div className="flex flex-col gap-1 text-primary-text overflow-x-hidden whitespace-nowrap text-ellipsis">
            <div className="text-base font-medium">{user.name}</div>
            <div className="text-sm text-secondary-text">{user.email}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Userslist;
