import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getEventsByUser } from "@/lib/actions/event.actions";
import Collection from "@/components/shared/Collection";
const Profile = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizedEvents = await getEventsByUser({ userId, page: 1 });
  return (
    <>
      {/* MY Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern md:py-10 py-5 bg-center bg-cover">
        <div className="wrapper flex-center sm:justify-between flex justify-center">
          <h3 className="h3-bold sm:text-left text-center">My Tickets</h3>
          <Button asChild className="button sm:flex hidden">
            <Link href={"/#events"}>Explore More events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        {" "}
        {/* <Collection
          data={events?.data}
          emptyTitle={"No Events Ticker Purchased Yet"}
          emptyStateSubtext={
            "No worries - plenty of exciting events to explore "
          }
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName=""
        /> */}
      </section>
      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern md:py-10 py-5 bg-center bg-cover">
        <div className="wrapper flex-center sm:justify-between flex justify-center">
          <h3 className="h3-bold sm:text-left text-center">Events Organized</h3>
          <Button asChild className="button sm:flex hidden">
            <Link href={"/events/create"}>Create New Event </Link>
          </Button>
        </div>
      </section>

      <Collection
        data={organizedEvents?.data}
        emptyTitle={"No Events have been created yet"}
        emptyStateSubtext={"No worries - plenty of exciting events to explore "}
        collectionType="Events_Organized"
        limit={3}
        page={1}
        totalPages={2}
        urlParamName="eventsPage"
      />
    </>
  );
};

export default Profile;