import React from "react";
import { Settings, Search, Menu } from "lucide-react";
// import { LogOut } from "lucide-react";
import { MyContext } from "../../MyContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { me } = useContext(MyContext);

  return (
    <header className="w-full bg-white px-6 py-3 h-fit">
      <div className="flex items-center justify-between gap-4">
        {/* Hamburger Menu Button (if needed) */}
        <button className="block lg:hidden p-2 hover:bg-gray-100 rounded-full">
          <Menu size={24} className="text-gray-600" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-white rounded-full pl-10 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Settings Button */}
          {/* <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Settings"
          >
            <Settings size={24} className="text-gray-600" />
          </button> */}

          {/* Profile Picture */}
          {/* <button className="relative group flex items-center gap-2 cursor-pointer bg-pink-100 p-2 rounded-full transition-colors duration-200">
            <LogOut
              size={24}
              className="text-pink-500 transform-gpu scale-x-[-1]"
            />
            <span className="text-pink-500">Logout</span>
          </button> */}

          {/* User Profile */}
          <Link
            to="/profile"
            className="flex items-center bg-white p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
          >
            <img
              alt="User Profile"
              src={`${
                import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
              }${me?.pfp}`}
              className="size-10 rounded-full object-cover"
            />
            {/* <div>
              <p className="text-xs">
                <strong className="block font-medium">{me?.username}</strong>
                <span>{me?.email}</span>
              </p>
            </div> */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
