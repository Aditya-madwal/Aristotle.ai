import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle function for opening and closing the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="lg:px-16 px-4 z-20 bg-custom-blue flex flex-wrap items-center shadow-md w-full fixed top-0 left-0">
        {/* Logo */}
        <div className="flex-1 flex justify-between items-center">
          {/* <img className="w-24" src="./logo.png" alt="Company Logo" /> */}
          <span className="text-xl text-opacity-90">
          EduGenius</span>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          type="button"
          className="z-10 md:hidden block focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Menu Button */}
          {isMenuOpen ? (
            <svg
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8 text-gray-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Menu Items with Slide Transition */}
        <div
          className={`fixed top-0 right-0 sm:w-full w-[70vw] h-full bg-custom-blue transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:items-center md:w-auto w-[40vw]`}
        >
          <nav className="md:flex items-center">
            <ul className="md:flex md:items-center md:space-x-8 sm:bg-custom-blue bg-light-gray h-screen sm:h-auto p-5 md:p-0 font-semibold md:font-normal sm:text-white text-dark pt-8 md:pt-0 w-full">
              <li>
                <a
                  className="block md:inline-block md:p-4 py-2 px-4 hover:text-gray-300"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="block md:inline-block md:p-4 py-2 px-4 hover:text-gray-300"
                  href="#"
                >
                  Our Features
                </a>
              </li>
              <li>
                <a
                  className="block md:inline-block md:p-4 py-2 px-4 hover:text-gray-300"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="block cursor-pointer md:inline-block md:p-4 py-2 px-4 hover:text-gray-300"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  className="block cursor-pointer md:inline-block md:p-4 py-2 px-4 hover:text-gray-300"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/* To create space for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
