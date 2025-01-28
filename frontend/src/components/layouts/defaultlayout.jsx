import React from "react";
import Sidebar from "./sidebar"; // Import the Sidebar component
import Header from "./header";

const DefaultLayout = ({ children, RightSidebar }) => {
    return (
        <div className="flex h-screen">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">{children}</div>
            </main>

            {/* Dynamic Right Sidebar */}
            {RightSidebar && <RightSidebar />}
        </div>
    );
};

export default DefaultLayout;
