import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { Event, SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Collection from "@/components/shared/Collection";
import CheckoutButton from "@/components/shared/CheckoutButton";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event: Event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern flex justify-center bg-contain">
        <div className="md:grid-cols-2 2xl:max-w-7xl grid grid-cols-1">
          <Image
            src={event.imageUrl}
            width={1000}
            height={1000}
            alt="hero"
            className="h-full min-h-[300px] object-cover object-center"
          />
          <div className="flex-w-full md:p-10 flex-col gap-6 p-5">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="sm:flex-row sm:items-center flex flex-col gap-3">
                <div className="flex gap-3">
                  <p className="p-bold-20 bg-green-500/10 inline-block px-5 py-2 text-green-700 rounded-full">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 inline-block rounded-full px-4 py-2.5 text-grey-500 bg-grey-500/10 ">
                    {event.category.name}
                  </p>
                </div>
                <p className="p-medium-18 sm:mt-0 mt-2 ml-2">
                  By{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName}
                    {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            {/* Checkout button */}
            <CheckoutButton event={event} />
            <div className="flex flex-col gap-5 mt-5">
              <div className="md:gap-3 flex gap-2">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  alt="calender"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly}-{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>

                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src={"/assets/icons/location.svg"}
                  width={32}
                  height={32}
                  alt="location"
                />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
                <p className="p-medium-16 lg:p-regular-18">
                  {event.description}
                </p>
                <p className="p-medium-16 lg:p-regular-18 text-primary-500 underline truncate">
                  <Link href={event.url}>{event.url}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Events From the same as a category */}
      <section className="wrapper md:gap-12 flex flex-col gap-8 my-8">
        <h2 className="h2-bold">Related events</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle={"No events found"}
          emptyStateSubtext={"Comeback later"}
          collectionType="Events_Organized"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default EventDetails;
