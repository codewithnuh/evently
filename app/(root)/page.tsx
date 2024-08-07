import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern md:py-10 py-5 bg-contain">
        <div className="wrapper md:grid-cols-2 2xl:gap-0 grid grid-cols-1 gap-5">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate : Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in the world-class
              companies with our global community
            </p>
            <Button size={"lg"} asChild className="button sm:w-fit w-full">
              <Link href={"#events"}>Explore More</Link>
            </Button>
          </div>
          <Image
            src={"/assets/images/hero.png"}
            width={1000}
            alt="hero"
            height={1000}
            className="max-h-[70vh] object-center object-contain 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events "
        className="wrapper md:gap-12 flex flex-col gap-8 my-8 border-2 border-red-500"
      >
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of Events
        </h2>
        <div className="md:flex-row flex flex-col w-full gap-5">
          search categeor
        </div>
      </section>
    </>
  );
};

export default page;
