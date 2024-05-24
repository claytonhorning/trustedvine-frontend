"use client";

import { useState, useEffect } from "react";
import {
  IconShovel,
  IconBookmark,
  IconFileText,
  IconMapPin,
  IconSettings,
  IconLogout2,
} from "@tabler/icons-react";

import Link from "next/link";
import Image from "next/image";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-2 items-center">
          <Image
            src={session?.user?.image ?? ""}
            height={35}
            width={35}
            alt="Profile Image"
            className="rounded-full"
          />
          <div>
            {
              session?.user?.name &&
                session.user.name
                  .split(" ") // Split the name into an array of words
                  .map((part, index, array) =>
                    index === 0
                      ? part
                      : index === array.length - 1
                      ? part.charAt(0) + "."
                      : ""
                  ) // Map over the words to keep the first name and the initial of the last name
                  .join(" ") // Join them back into a string
            }
          </div>
        </div>
        <a
          onClick={() => signOut()}
          className="flex flex-row items-center cursor-pointer"
        >
          <IconLogout2 size={20} className="mr-2" />
          Logout
        </a>
      </div>
    );
  }
  return (
    <>
      <a
        className="bg-[#1877F2] p-3 rounded-md text-white font-medium text-md w-full flex flex-row items-center space-x-2 cursor-pointer"
        onClick={() => signIn("facebook")}
      >
        <Image
          src="/facebook_logo.png"
          width={20}
          height={20}
          alt="facebook logo"
        />

        <p>Login with Facebook</p>
      </a>
    </>
  );
}

export default function Sidebar() {
  const { data: session } = useSession();
  const [activeItem, setActiveItem] = useState("Find");

  const handleClick = (item: any) => {
    setActiveItem(item);
  };

  return (
    <section className="sticky top-0 hidden md:flex sm:w-52 md:w-80 h-screen bg-[#132A13] px-4 py-5 flex-col justify-between">
      <div className="flex flex-col space-y-4">
        <Image
          src="/logo.png"
          alt="logo"
          height={150}
          width={150}
        />

        <div className="flex flex-row items-center">
          <IconMapPin
            size={20}
            color="#ECF39E"
            className="mr-1"
          />
          <p>Roaring Fork Valley</p>
        </div>
        <ul className="text-sm space-y-4">
          <Link passHref href={"/roaringforkvalley"}>
            <li
              key={"Find"}
              onClick={() => handleClick("Find")}
              className={
                activeItem == "Find"
                  ? "mb-2 flex flex-row items-center bg-[#ECF39E] text-[#31572C] p-3 rounded-md font-medium cursor-pointer"
                  : "mb-2 flex flex-row items-center bg-[#31572C] text-white p-3 rounded-md font-regular cursor-pointer"
              }
            >
              <IconShovel className="mr-2" /> Find Local
              Contractors
            </li>
          </Link>
          <Link href={"/roaringforkvalley/trusted"}>
            <li
              key={"Trusted"}
              onClick={() => handleClick("Trusted")}
              className={
                activeItem == "Trusted"
                  ? "mb-2 flex flex-row items-center bg-[#ECF39E] text-[#31572C] p-3 rounded-md font-medium cursor-pointer"
                  : "mb-2 flex flex-row items-center bg-[#31572C] text-white p-3 rounded-md font-regular cursor-pointer"
              }
            >
              <IconBookmark className="mr-2" />
              My Trusted Contractors
            </li>
          </Link>
          {/* <Link href={"/roaringforkvalley/quotes"}>
            <li
              key={"Quotes"}
              onClick={() => handleClick("Quotes")}
              className={
                activeItem == "Quotes"
                  ? "flex flex-row items-center bg-[#ECF39E] text-[#31572C] p-3 rounded-md font-medium cursor-pointer"
                  : "flex flex-row items-center bg-[#31572C] text-white p-3 rounded-md font-regular cursor-pointer"
              }
            >
              <IconFileText className="mr-2" />
              Quotes Requested
            </li>
          </Link> */}
        </ul>
      </div>
      <div className="flex flex-row items-center justify-between text-xs">
        <AuthButton />
      </div>
    </section>
  );
}
