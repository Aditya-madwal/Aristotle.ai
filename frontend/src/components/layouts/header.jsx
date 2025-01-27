import React from 'react';
import { Settings, Search, Menu } from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full bg-white border-b px-6 py-3 h-fit">
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
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        aria-label="Settings"
                    >
                        <Settings size={24} className="text-gray-600" />
                    </button>

                    {/* Profile Picture */}
                    <button className="relative group">
                        <img
                            src="https://i.pinimg.com/736x/c3/88/80/c3888023324759ca0e60fdbb9b2a6119.jpg"
                            alt="Profile"
                            className="w-8 h-8 rounded-full cursor-pointer"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
