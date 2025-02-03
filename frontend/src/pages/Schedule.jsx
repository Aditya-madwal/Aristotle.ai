import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import DefaultLayout from "../components/layouts/defaultlayout";
import EventSidebar from "../components/schedule/EventSidebar";
// import Calendar from "../components/schedule/Calendar";
import ScheduleDashboard from "../components/schedule/ScheduleDashboard";

const Schedule = () => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(me);
  useEffect(() => {
    me ? setMyinfo(me) : null;
  }, [me]);

  const eventData = {
    eventTitle: "Complete the task#12",
    date: "13 May, 2024",
    colorHex: "#00FF00", // Green color
    categoryName: "Task",
    description:
      "Quis proident adipiscing sunt proident dolor et dolore proident fugiat ad nulla incididunt qui.",
    eventUid: "event-123",
  };

  const EventSidebarWithProps = () => (
    <EventSidebar
      eventTitle={eventData.eventTitle}
      date={eventData.date}
      colorHex={eventData.colorHex}
      categoryName={eventData.categoryName}
      description={eventData.description}
      eventUid={eventData.eventUid}
    />
  );

  return (
    <>
      <DefaultLayout RightSidebar={EventSidebarWithProps}>
        <div className="p-6 bg-gray-100 min-h-screen flex  justify-center">
          <ScheduleDashboard />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Schedule;
