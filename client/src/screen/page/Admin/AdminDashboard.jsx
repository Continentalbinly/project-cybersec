import React, { useState } from "react";
import AdminDataTable from "./Page/Arppovement";
import CourseManager from "./Page/CourseManager";
import Certificate from "./Page/Certificate";
import RedeemController from "./Page/RedeemController";
import ExamController from "./Page/ExamController";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(
    "request",
    "operation",
    "exam",
    "redeem",
    "certificate"
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => handleTabClick("request")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "request"
                  ? "text-gray-600 border-blue-600 dark:border-blue-500 dark:text-gray-300"
                  : ""
              }`}
            >
              User Manager
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabClick("operation")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "operation"
                  ? "text-blue-600 border-blue-600 dark:border-blue-500 dark:text-gray-300"
                  : ""
              }`}
            >
              Course Manager
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabClick("exam")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "exam"
                  ? "text-gray-600 border-blue-600 dark:border-blue-500 dark:text-gray-300"
                  : ""
              }`}
            >
              Exam Manager
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabClick("redeem")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "redeem"
                  ? "text-gray-600 border-blue-600 dark:border-blue-500 dark:text-gray-300"
                  : ""
              }`}
            >
              Redeem Manager
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabClick("certificate")}
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === "certificate"
                  ? "text-gray-600 border-blue-600 dark:border-blue-500 dark:text-gray-300"
                  : ""
              }`}
            >
              Certificate Manager
            </button>
          </li>
        </ul>
      </div>
      <br />
      <div>
        {activeTab === "request" && <AdminDataTable />}
        {activeTab === "operation" && <CourseManager />}
        {activeTab === "exam" && <ExamController />}
        {activeTab === "redeem" && <RedeemController />}
        {activeTab === "certificate" && <Certificate />}
      </div>
    </section>
  );
}

export default AdminDashboard;
