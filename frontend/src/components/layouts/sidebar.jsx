import { useContext, useState } from "react";
import { Menu, X, Home, BarChart, Calendar, Settings } from "lucide-react";
import { MyContext } from "../../MyContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { activeTab, setActiveTab, me } = useContext(MyContext);
    // console.log(me);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Menu Items Array
    const menuItems = [
        { name: "Dashboard", icon: <Home size={24} />, link: "/", tab: "dashboard" },
        { name: "Reports", icon: <BarChart size={24} />, link: "/reports", tab: "Reports" },
        { name: "Schedule", icon: <Calendar size={24} />, link: "/schedule", tab: "Schedule" },
        { name: "Settings", icon: <Settings size={24} />, link: "/settings", tab: "Settings" }
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`flex h-screen flex-col justify-between bg-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
            >
                <div className="px-4 py-4">
                    {/* Logo */}
                    <div className="flex items-center justify-between gap-2">
                        <button
                            onClick={toggleSidebar}
                            className={`grid h-10 place-content-center rounded-lg bg-gray-100 text-lg font-semibold text-gray-600 transition-all duration-300 w-full`}
                        >
                            {isSidebarOpen ? "Aristotle.ai" : "A"}
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <ul className="mt-6 space-y-1">
                        {menuItems.map(({ name, icon, link, tab }) => (
                            <li key={tab}>
                                <Link
                                    to={link}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex 
                                        ${isSidebarOpen ? "justify-start" : "justify-center"}
                                        items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${activeTab === tab ? "text-[#7f55e0] bg-[#7f55e0] bg-opacity-20" : "text-gray-500 hover:bg-gray-100"}`}
                                >
                                    <span className="flex-shrink-0">
                                        {icon}
                                    </span>
                                    {isSidebarOpen && name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Profile */}
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img
                            alt="User Profile"
                            src={`${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}${me?.pfp}`}
                            className="size-10 rounded-full object-cover"
                        />
                        {isSidebarOpen && (
                            <div>
                                <p className="text-xs">
                                    <strong className="block font-medium">{me?.username}</strong>
                                    <span>{me?.email}</span>
                                </p>
                            </div>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
