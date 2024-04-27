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

  return (
    <>

      <div className="text-xl font-semibold flex justify-between">
        <h5>ເພີ່ມຄອດສ໌ ແລະ ບົດຮຽນ</h5>
        <button
          onClick={handleNavigate}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            ເພີ່ມ
          </span>
        </button>

      </div>
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ຄອດສ໌ຮຽນ
              </th>
              <th scope="col" className="px-6 py-3">
                ບົດຮຽນ
              </th>
              <th scope="col" className="px-6 py-3">
                ລາຍລະອຽດ
              </th>
              <th scope="col" className="px-6 py-3">
                ຄະແນນລວມ

              </th>
              <th scope="col" className="px-6 py-3 flex justify-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {course.courseTitle}
                </td>
                {/* <td className="px-6 py-4">{course.lessons.length}</td> */}
                <td className="px-6 py-4">{course.description}</td>
                <td className="px-6 py-4">{course.students}</td>
                <td className="px-6 py-4 flex justify-center">
                  <button
                    onClick={() => handleEditCourse(course._id)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      ແກ້ໄຂ
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    type="button"
                    className="px-3 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg me-2 mb-2 dark:bg-gray-800 dark:text-red-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    ລົບ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

}

export default AddLessen;
