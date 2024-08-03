import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex-center flex-between sm:flex-row flex flex-col gap-4 p-5 text-center">
        <Link href={"/"}>
          <Image
            alt="Evently Logo "
            src={"/assets/images/logo.svg"}
            width={128}
            height={38}
          />
        </Link>
        <p>2024 Evently. All rights reserverd</p>
      </div>
    </footer>
  );
};
export default Footer;
