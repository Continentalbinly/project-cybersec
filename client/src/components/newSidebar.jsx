import React from "react";
import { Link, useLocation } from "react-router-dom";

function NewSidebar({ isOpen }) {
  const location = useLocation();

  return (
    <aside
      className={`flex-none h-full w-64 px-4 py-16 bg-gray-800 text-white lg:block ${
        isOpen ? "" : "hidden"
      }`}
    >
      <nav>
        <ul>
          <li className="mb-4">
            <a
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                location.pathname === "/" ? "bg-gray-900" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L1 9v12h6v-7h10v7h6V9l-11-7Zm8 16h-4v-6h-4v6H4V9.586L12 4.586l8 5.172V18Z" />
              </svg>
              <span className="ms-3">ຄອດສ໌ຮຽນ</span>
            </a>
          </li>
          <li className="mb-4">
            <Link
              to="/feuature"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                location.pathname === "/feuature" ? "bg-gray-900" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
              </svg>
              <span>Feature</span>
            </Link>
          </li>
          <hr />
          <br />
          <li>
            <Link
              to="/admin-dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                location.pathname === "/admin-dashboard" ? "bg-gray-900" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="7" y1="16" x2="17" y2="16" />
              </svg>
              <span>Admin Dashboard</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default NewSidebar;
