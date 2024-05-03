import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthAdmin } from "../hook/useAuthAdmin";
import { useAuthGuest } from "../hook/useAuthGuest";

function NewSidebar({ isOpen }) {
  const location = useLocation();
  const { isAdmin } = useAuthAdmin();
  const { isGuest } = useAuthGuest();
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
    <aside
      className={`flex-none h-full w-64 px-4 py-16 bg-white border-b border-gray-200 dark:bg-gray-100 dark:border-gray-100 lg:block ${
        isOpen ? "" : "hidden"
      }`}
    >
      <nav className="">
        <ul className="space-y-4">
          <h5>ຄອນເທັ້ນ</h5>

          <li>
            <a
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg dark:text-white text-black cursor-pointer hover:bg-gray-100 ${
                location.pathname === "/"
                  ? "bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
              </svg>
              <span className="ms-3">ຄອດສ໌ຮຽນ</span>
            </a>
          </li>
          {!isGuest && (
            <>
              <li>
                <a
                  href="/exam"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg dark:text-white text-black cursor-pointer hover:bg-gray-900 ${
                    location.pathname === "/exam"
                      ? "bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="2"
                      width="18"
                      height="20"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="11.5" r="4.5"></circle>
                    <line x1="12" y1="16" x2="12" y2="16"></line>
                    <line x1="12" y1="12" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="8"></line>
                  </svg>
                  <span>ສອບເສັງ</span>
                </a>
              </li>
              <li>
                <a
                  href="/feuature"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg dark:text-white text-black cursor-pointer hover:bg-gray-900 ${
                    location.pathname === "/feuature"
                      ? "bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 29 29"
                    fill="none"
                    id="user"
                    stroke="currentColor"
                    width="24"
                    height="24"
                  >
                    <path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z"></path>
                  </svg>
                  <span>ຂໍ້ມູນຂອງຂ້ອຍ</span>
                </a>
              </li>
              <li>
                <a
                  href="/redeemshop"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg dark:text-white text-black cursor-pointer hover:bg-gray-900 ${
                    location.pathname === "/redeemshop"
                      ? "bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shopping-cart"
                    width="24"
                    height="24"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61H17a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span>ແລກຂອງລາງວັນ</span>
                </a>
              </li>
              <hr />
              <h5>ສ່ວນຕົວ</h5>
              <li>
                <a
                  href="/setting"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg dark:text-white text-black cursor-pointer hover:bg-gray-900 ${
                    location.pathname === "/setting"
                      ? "bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    fill="none"
                    stroke="currentColor"
                    width="24"
                    height="24"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
                  </svg>
                  <span>ຕັ້ງຄ່າ</span>
                </a>
              </li>
            </>
          )}

          {isAdmin && (
            <li className="mt-auto">
              <a
                href="/admin"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg dark:text-white text-black cursor-pointer hover:bg-gray-100 ${
                  location.pathname === "/admin"
                    ? "bg-gray-100 dark:bg-gray-100 dark:border-gray-100"
                    : ""
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
                <span>ກະດານຜູ້ດູແລ</span>
              </a>
            </li>
          )}
          <li className="absolute bottom-2 ">
            <a
              className={` w-[220px] flex items-center space-x-2 px-4 py-2 rounded-lg dark:text-red-500 text-black cursor-pointer hover:bg-gray-100`}
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default NewSidebar;
