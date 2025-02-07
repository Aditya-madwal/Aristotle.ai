import MiniCalendar from "./MiniCalendar";
import React from "react";
import UserIdentity from "./UserIdentity";
import SubjectStats from "./RoadmapProgress";

function UserDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-full lg:col-span-2 gap-4">
          <UserIdentity />
          <SubjectStats />
        </div>
        <div className="h-full">
          <MiniCalendar />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
