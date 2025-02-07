import MiniCalendar from "./MiniCalendar";
import React from "react";
import UserIdentity from "./UserIdentity";

function UserDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2">
          <UserIdentity />
        </div>
        <div className="h-32 rounded-lg bg-gray-200">
          <MiniCalendar />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
