import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch courses from API
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/course/getcourse");
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          console.error("Error fetching courses:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const getTotalTasks = (course) => {
    let totalTasks = 0;
    course.lessons.forEach((lesson) => {
      totalTasks += lesson.tasks.length;
    });
    return totalTasks;
  };

  const getTotalPoints = (course) => {
    let totalPoints = 0;
    course.lessons.forEach((lesson) => {
      lesson.tasks.forEach((task) => {
        totalPoints += task.point || 0; 
      });
    });
    return totalPoints;
  };

  return (
    <section>
      <div className="flex justify-center">
        <h2 className="text-3xl font-semibold">
          Welcome to Cybersecurity Awareness
        </h2>
      </div>
      <br />
      <div>
        <h4 className="text-xl font-semibold">ຄອດສ໌ຮຽນທັ້ງໝົດ</h4>
      </div>
      <br />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="rounded w-full h-auto p-2 bg-gray-800 cursor-pointer hover:bg-gray-700"
            >
              <img
                className="rounded"
                src={course.previewImage}
                alt={course.courseTitle}
              />
              <div className="pt-3 text-[16px]">{course.courseTitle}</div>
              <div className="pt-1 text-[12px]">
                ລາຍລະອຽດ: {course.description}
              </div>
              <div className="pt-1 text-[12px]">
                ບົດຮຽນ: {course.lessons.length}
              </div>
              <div className="pt-1 text-[12px]">
                ກິດຈະກຳ: {getTotalTasks(course)}
              </div>
              <div className="pt-1 text-[12px]">
                ຄະແນນລວມ: {getTotalPoints(course)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
