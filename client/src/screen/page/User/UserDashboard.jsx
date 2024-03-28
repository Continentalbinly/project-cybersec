import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function UserDashboard() {
  const chartRef = useRef(null);

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
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <h5 className="text-xl">ກະດານຂໍ້ມູນ</h5>
        </div>
      </div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
}

export default UserDashboard;
