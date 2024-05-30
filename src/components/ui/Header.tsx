"use client";

import Image from "next/image";
import { IconLogout2 } from "@tabler/icons-react";
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-row text-xs space-x-2">
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
        </a>
      </div>
    );
  }
  return (
    <>
      <a
        className="bg-[#1877F2] p-2 rounded-md text-white font-medium text-xs flex flex-row items-center space-x-2 cursor-pointer max-w-32 sm:max-w-52"
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

export default function Header() {
  return (
    <div className="h-16 w-full bg-[#132A13] md:hidden flex flex-row items-center justify-between px-5">
      <div className="flex flex-col space-y-1">
        <Image
          src="/logo.png"
          height={180}
          width={180}
          alt="TrustedVine Logo"
        />
        <p className="text-xs ml-2">Roaring Fork Valley</p>
      </div>
      <AuthButton />
    </div>
  );
}
