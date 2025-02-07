import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarServices } from "../../lib/api/ScheduleServices/CalendarServices";

const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [colorHex, setColorHex] = useState("#3A7D44"); // Default green
  // const [status, setStatus] = useState(false);

  const colors = [
    { name: "Green", value: "#3A7D44" },
    { name: "Red", value: "#D70654" },
    { name: "Blue", value: "#1E90FF" },
    { name: "Orange", value: "#FF5733" },
    { name: "Purple", value: "#8A2BE2" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;

    const newEvent = {
      eventTitle,
      description,
      date: eventDate,
      // status,
      colorHex,
    };

    try {
      // Call the API to create the event
      const createdEvent = await CalendarServices.createEvent(newEvent);

      // Call the onAddEvent prop to update the parent component's state
      onAddEvent(createdEvent);

      // Reset the form
      resetForm();
    } catch (error) {
      console.error("Error creating event:", error);
      // Optionally, add error handling (e.g., show error message to user)
    }
  };

  const resetForm = () => {
    setEventTitle("");
    setDescription("");
    setEventDate("");
    setColorHex("#3A7D44");
    // setStatus(false);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl 
                p-6 relative 
                border border-gray-200 
                transform transition-all 
                overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Modal Title */}
                <Dialog.Title className="text-center mb-6">
                  <h2
                    className="text-2xl font-bold text-gray-800 
                  bg-gradient-to-r from-purple-600 to-blue-600 
                  text-transparent bg-clip-text"
                  >
                    Create New Event
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Add a new event to your schedule
                  </p>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Event Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="What's the event?"
                      className="w-full px-4 py-2.5 border border-gray-300 
                      rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent 
                      transition-all duration-300 
                      placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add some details"
                      className="w-full px-4 py-2.5 border border-gray-300 
                      rounded-lg min-h-[100px] 
                      focus:outline-none focus:ring-2 
                      focus:ring-purple-500 
                      focus:border-transparent 
                      transition-all duration-300 
                      placeholder-gray-400"
                    />
                  </div>

                  {/* Date Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 
                        rounded-lg pl-10 
                        focus:outline-none focus:ring-2 
                        focus:ring-purple-500 
                        focus:border-transparent 
                        transition-all duration-300"
                        required
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-1/2 -translate-y-1/2 
                        h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Color
                    </label>
                    <div className="flex space-x-2">
                      {colors.map(({ name, value }) => (
                        <button
                          key={value}
                          type="button"
                          title={name}
                          onClick={() => setColorHex(value)}
                          className={`w-9 h-9 rounded-full 
                          ${
                            colorHex === value
                              ? "ring-2 ring-offset-2 ring-purple-500"
                              : ""
                          }`}
                          style={{ backgroundColor: value }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Status Selection */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="false"
                          checked={!status}
                          onChange={() => setStatus(false)}
                          className="form-radio text-purple-600"
                        />
                        <span className="ml-2">Pending</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="true"
                          checked={status}
                          onChange={() => setStatus(true)}
                          className="form-radio text-purple-600"
                        />
                        <span className="ml-2">Completed</span>
                      </label>
                    </div>
                  </div> */}

                  {/* Submit and Cancel Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r 
                      from-purple-600 to-blue-600 
                      text-white rounded-lg"
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddEventModal;
