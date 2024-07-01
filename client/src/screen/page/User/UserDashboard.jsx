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
    const updateChartData = () => {
      if (userData) {
        // Prepare data for the current month
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Filter tasks taken and exams statistics for the current month
        const filteredTasks = userData.taskTaken.filter((task) => {
          const taskDate = new Date(task.createdAt);
          return taskDate >= firstDayOfMonth && taskDate <= lastDayOfMonth;
        });

        const filteredExams = userData.examsStatistics.filter((statistic) => {
          const examDate = new Date(statistic.createdAt);
          return examDate >= firstDayOfMonth && examDate <= lastDayOfMonth;
        });

        // Count tasks completed per day
        const dailyTaskData = {};
        filteredTasks.forEach((task) => {
          const day = new Date(task.createdAt).getDate();
          if (!dailyTaskData[day]) {
            dailyTaskData[day] = 0;
          }
          dailyTaskData[day]++;
        });

        // Count exams completed per day
        const dailyExamData = {};
        filteredTasks.forEach((exam) => {
          const day = new Date(exam.createdAt).getDate();
          if (!dailyExamData[day]) {
            dailyExamData[day] = 0;
          }
          dailyExamData[day]++;
        });

        // Sum up scores per day from exams statistics
        const dailyScoreData = {};
        filteredExams.forEach((statistic) => {
          const day = new Date(statistic.createdAt).getDate();
          if (!dailyScoreData[day]) {
            dailyScoreData[day] = 0;
          }
          dailyScoreData[day] += statistic.score;
        });

        // Prepare labels and datasets for Chart.js
        const labels = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1); // Days of the month
        const taskData = labels.map((day) => dailyTaskData[day] || undefined);
        const examData = labels.map((day) => dailyExamData[day] || undefined);
        const scoreData = labels.map((day) => dailyScoreData[day] || undefined); // Use undefined for no data

        const data = {
          labels: labels.map((day) => day.toString()), // Convert to string for Chart.js
          datasets: [
            {
              label: "Score",
              data: scoreData,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Task Complete",
              data: taskData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Exam Complete",
              data: examData,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
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
      }
    };

    updateChartData();

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [userData]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {userData && (
          <div className="">
            <img
              className="w-40 h-40 rounded-full"
              src={userData.userImg}
              alt="User Avatar"
            />
            <p>
              {userData.userName} {userData.userSurname}
            </p>
            <p>{userData.userEmail}</p>
            <p>ສະຖານະ: {userData.status}</p>
            <p>ຄະແນນ: {userData.score}</p>
            <p>ແຕ້ມ: {userData.point}</p>
            <p>ສະຖິຕິກິດຈະກຳ: {userData.taskTaken.length}</p>
            <p>ສະຖິຕິເຂົ້າເສັງ: {userData.examsStatistics.length}</p>
          </div>
        )}
        <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 col-span-2">
          <div className="justify-between mb-3">
            <div className="items-center">
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
          <br />
          <div>{activeTab === "mycertificate" && <MyCertificate />}</div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
