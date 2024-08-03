import { SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt="Logo"
            width={128}
            height={38}
          />
        </Link>

        <SignIn></SignIn>
        <div className="w-52 flex justify-end gap-3">
          <SignIn>
            <UserButton afterSignOutUrl="/" />
            <NavItems />
          </SignIn>
          <SignedOut>
            <Button asChild className="rounded-full" size={"lg"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
