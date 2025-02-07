import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import { Plus } from "lucide-react";
import Calendar from "./Calendar";
import AddEventModal from "./AddEventModal"; // Importing the modal we just created
import { CalendarServices } from "../../lib/api/ScheduleServices/CalendarServices";

const ScheduleDashboard = ({ setEventProps }) => {
  const { me, setMe } = useContext(MyContext);
  const [myinfo, setMyinfo] = useState(me);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  const fetchEvents = () => {
    try {
      CalendarServices.getAllEvents().then((response) => {
        // Transform the flat array into a date-keyed object
        const eventsByDate = response.reduce((acc, event) => {
          if (!acc[event.date]) {
            acc[event.date] = [];
          }
          acc[event.date].push(event);
          return acc;
        }, {});
        setEvents(eventsByDate);
        console.log(eventsByDate);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // useEffect(() => {
  //   me ? setMyinfo(me) : null;
  // }, [me]);

  const handleAddEvent = (newEvent) => {
    console.log("New Event:", newEvent);
    setIsModalOpen(false);
  };

  return (
    <>
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
      <section className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-3">
          <h1 className="flex items-center text-2xl font-semibold text-gray-800">
            {me?.name}'s
            <span className="text-purple-600 ml-2">Schedule</span>
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 bg-purple-100 p-2 px-4 rounded-full"
          >
            <Plus size={20} />
            <span className="text-sm font-medium">Add Event</span>
          </button>
        </div>
        <Calendar setEventProps={setEventProps} events={events} />
      </section>
    </>
  );
};

export default ScheduleDashboard;
