import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";

// This component represents the home page of the application
const HomePage = async ({ searchParams }: SearchParamProps) => {
  // Extracting search parameters
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  // Fetching events based on search parameters
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      {/* Hero section */}
      <section className="bg-primary-50 bg-dotted-pattern md:py-10 py-5 bg-contain">
        <div className="wrapper md:grid-cols-2 2xl:gap-0 grid grid-cols-1 gap-5">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
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

      {/* Events section */}
      <section
        id="events"
        className="wrapper md:gap-12 flex flex-col gap-8 my-8"
      >
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of Events
        </h2>
        <div className="md:flex-row flex flex-col w-full gap-5">
          {/* Search component for filtering events */}
          <Search placeholder="Search Events" />
        </div>

        {/* Displaying events collection */}
        <Suspense fallback={<p>Loading...</p>}>
          <Collection
            data={events?.data}
            emptyTitle={"No events found"}
            emptyStateSubtext={"Comeback later"}
            collectionType="all_Events"
            limit={6}
            page={1}
            totalPages={2}
          />
        </Suspense>
      </section>
    </>
  );
};

export default HomePage;
