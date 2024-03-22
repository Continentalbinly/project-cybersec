import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-10">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <div>Logo</div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`text-white rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === "/"
                      ? "bg-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                >
                  ຄອດສ໌ຮຽນ
                </Link>
                <Link
                  to="/feuature"
                  className={`text-white rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === "/feuature"
                      ? "bg-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={
                    location.pathname === "/feuature" ? "page" : undefined
                  }
                >
                  ສະແຕັດທ໌
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex items-center ml-4 sm:ml-6">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-white px-3 py-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
              />
            </div>
            <div className="hidden sm:flex flex-row font-bold pl-2">
              Coins: <a className="underline text-yellow-300 pl-1">999</a>
            </div>
            <div className="hidden sm:block pl-2">Mr.Debugger</div>
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  onClick={handleToggleUserMenu}
                  className="block relative rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">User menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://i.pinimg.com/736x/00/7d/85/007d85591e9ea14e737977be9345dfe3.jpg"
                    alt=""
                  />
                </button>
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      View Profile
                    </a>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Policy
                    </a>
                    <a
                      type="button"
                      className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleToggleMenu}
              type="button"
              className="sm:hidden relative rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`text-white block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/"
                ? "bg-gray-900"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            ຄອດສ໌
          </Link>
          <Link
            to="/feuature"
            className={`text-white block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/feuature"
                ? "bg-gray-900"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            aria-current={
              location.pathname === "/feuature" ? "page" : undefined
            }
          >
            ສະແຕັດທ໌
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
