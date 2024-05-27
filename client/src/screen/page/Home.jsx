import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthUser } from "../../hook/useAuthUser";
import { useAuthGuest } from "../../hook/useAuthGuest";
import { useAuthAdmin } from "../../hook/useAuthAdmin";

function Home() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const { isUser, loading: loadingUser, error: errorUser } = useAuthUser();
  const { isGuest, loading: loadingGuest, error: errorGuest } = useAuthGuest();
  const { isAdmin, loading: loadingAdmin, error: errorAdmin } = useAuthAdmin();
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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

  const handleCourseClick = (coursePermission) => {
    if (!isUser && !isAdmin && coursePermission !== "guest") {
      setShowModal(true);
    }
  };

  if (loadingUser || loadingGuest || loadingAdmin) {
    return <div>Loading...</div>;
  }

  if (errorUser || errorGuest || errorAdmin) {
    return <div>Error fetching user data.</div>;
  }

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
              className={`rounded w-full h-auto p-2 cursor-pointer ${
                (!isUser && !isAdmin && course.permission !== "guest")
                  ? "bg-gray-300"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              onClick={() => handleCourseClick(course.permission)}
            >
              <Link
                to={
                  isUser || isAdmin || course.permission === "guest"
                    ? `/lesson/${course._id}`
                    : "#"
                }
                className="block"
              >
                <img
                  className={`rounded ${
                    (!isUser && !isAdmin && course.permission !== "guest") ? "blur-sm" : ""
                  }`}
                  src={course.previewImage}
                  alt={course.courseTitle}
                />
                <div className="pt-3 text-[16px]">{course.courseTitle}</div>
                <div className="pt-1 text-[12px]">
                  ລາຍລະອຽດ: {course.description}
                </div>
                {(!isUser && !isAdmin && course.permission !== "guest") && (
                  <div className="pt-1 text-[12px] text-red-600 font-semibold">
                    Locked
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Please Register</h2>
            <p className="mb-4">You need to register to access this course.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;
