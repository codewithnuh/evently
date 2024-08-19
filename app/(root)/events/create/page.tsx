import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-purple-50 bg-dotted-pattern md:py-10 py-5 bg-center bg-cover">
        <h3 className="wrapper h3-bold sm:text-left text-center">
          {" "}
          Create Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm userId={userId as string} type="Create" />
      </div>
    </>
  );
};
export default CreateEvent;
