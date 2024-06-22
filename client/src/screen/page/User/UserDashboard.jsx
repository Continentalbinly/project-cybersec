import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useAuthContext } from "../../../hook/useAuth";
import MyCertificate from "./MyCertificate";

function UserDashboard() {
  const { userData } = useAuthContext();
  const chartRef = useRef(null);
  const [activeTab, setActiveTab] = useState("mycertificate");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Chart data
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Score",
          data: [26, 21, 8, 5, 20, 15, 34],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Task Complete",
          data: [10, 15, 20, 25, 30, 35, 40], // Example data for the second dataset
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Green color for the second dataset
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    const ctx = chartRef.current;
    if (ctx && ctx.chart) {
      ctx.chart.destroy();
    }
    ctx.chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });
    return () => {
      if (ctx && ctx.chart) {
        ctx.chart.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {userData && (
          <div className="">
            <img className="w-40 h-40 rounded-full" src={userData.userImg} />
            <p>
              {userData.userName} {userData.userSurname}
            </p>
            <p>
              {userData.userEmail}
            </p>
            <p>ສະຖານະ: {userData.status}</p>
            <p>ຄະແນນ: {userData.score}</p>
            <p>ແຕ້ມ: {userData.point}</p>
            <p>ສະຖິຕິພາລະກິດ: {userData.task}</p>
          </div>
        )}
        <div className=" bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 col-span-2">
          <div className=" justify-between mb-3">
            <div className=" items-center">
              <h5 className="text-xl">ກະດານຂໍ້ມູນ</h5>
            </div>
          </div>
          <div>
            <canvas ref={chartRef} height="150"></canvas>
          </div>
        </div>
      </div>
      <br />
      <div>
        <section>
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button
                  onClick={() => handleTabClick("certificate")}
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    activeTab === "mycertificate"
                      ? "text-gray-600 border-blue-600 dark:border-blue-500 dark:text-gray-300"
                      : ""
                  }`}
                >
                  ໃບຢັ້ງຢືນຂອງຂ້ອຍ
                </button>
              </li>
            </ul>
          </div>
          <br />
          <div>{activeTab === "mycertificate" && <MyCertificate />}</div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
