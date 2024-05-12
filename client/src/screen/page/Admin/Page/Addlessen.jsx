import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddLessen() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/create/course");
  };
  
  useEffect(() => {
    // Fetch courses from API
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

  const handleEditCourse = (courseId) => {
    // Handle edit operation
    console.log("Edit course:", courseId);
  };

  const handleDeleteCourse = (courseId) => {
    // Handle delete operation
    console.log("Delete course:", courseId);
  };

  const handleAddLesson = (courseId) => {
    // Navigate to the "Add Lesson" page for the selected course
    navigate(`/admin/add/lesson/${courseId}`);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-xl font-semibold">ເພີ່ມຄອດສ໌ ແລະ ບົດຮຽນ</h5>
          <button
            onClick={handleNavigate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            ເພີ່ມຄອດສ໌
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">ຄອດສ໌ຮຽນ</th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">ລາຍລະອຽດ</th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">ສິດເຂົ້າເຖິງ</th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">Action</th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">Add Lesson</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{course.courseTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.permission}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditCourse(course._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleAddLesson(course._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Add Lesson
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AddLessen;
