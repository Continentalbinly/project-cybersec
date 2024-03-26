import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar({ setIsSidebarOpen }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleToggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    setIsSidebarOpen(!isMenuOpen);
    const sidebar = document.getElementById("logo-newsidebar");
    if (sidebar) {
      if (!isMenuOpen) {
        sidebar.classList.remove("-translate-x-full");
      } else {
        sidebar.classList.add("-translate-x-full");
      }
    }
  };

  const handleClickOutsideMenu = (event) => {
    const sidebar = document.getElementById("logo-newsidebar");
    if (sidebar && !sidebar.contains(event.target)) {
      setIsMenuOpen(false);
      sidebar.classList.add("-translate-x-full");
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideUserMenu = (event) => {
      if (
        !event.target.closest("[data-dropdown-toggle='dropdown-user']") &&
        !event.target.closest(".user-menu")
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutsideUserMenu);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideUserMenu);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("@auth");
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    } finally {
      window.location.reload();
    }
  };
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {isSmallScreen && (
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  onClick={(event) => handleToggleMenu(event)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
              )}
              <a className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white hidden sm:block">
                  Cyber
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className=" px-3 py-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-600"
              />
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={handleToggleUserMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        View Profile
                      </a>
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Policy
                      </a>
                      <a
                        type="button"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
