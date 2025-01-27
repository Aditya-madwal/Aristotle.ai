import React from "react";
import Sidebar from "./sidebar"; // Import the Sidebar component
import Header from "./header";
const DefaultLayout = ({ children }) => {
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <Header />
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
};

export default DefaultLayout;
