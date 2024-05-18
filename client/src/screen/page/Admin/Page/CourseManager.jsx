import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LessonForm from "./forms/LessonForm";

function CourseManager() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLessonFormVisible, setIsLessonFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/create/course");
  };

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

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("/lesson/getlessons");
        if (response.data.success) {
          setLessons(response.data.lessons);
        } else {
          console.error("Error fetching lessons:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleEditCourse = (courseId) => {
    navigate(`/admin/edit/course/${courseId}`);
  };

  const handleDeleteCourse = (courseId) => {
    console.log("Delete course:", courseId);
  };

  const handleAddLesson = (courseId) => {
    navigate(`/admin/add/lesson/${courseId}`);
  };

  const handleEditLesson = (lessonId) => {
    const lessonToEdit = lessons.find((lesson) => lesson._id === lessonId);
    setSelectedLesson(lessonToEdit);
    setIsLessonFormVisible(true);
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await axios.delete(`/lesson/deletelesson/${lessonId}`);
      const updatedLessons = lessons.filter(
        (lesson) => lesson._id !== lessonId
      );
      setLessons(updatedLessons);
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };


  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-6 bg-white rounded-md text-black shadow-md">
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
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ຄອດສ໌ຮຽນ
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ລາຍລະອຽດ
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ສິດເຂົ້າເຖິງ
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  Action
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ສ່ວນເສີມ
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.courseTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.permission}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditCourse(course._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                    >
                      ແກ້ໄຂ
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2"
                    >
                      ລົບ
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleAddLesson(course._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      ເພີ່ມບົດຮຽນ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="max-w-screen-2xl mx-auto p-6 bg-white rounded-md text-black shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-xl font-semibold">Lesson Operator</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ຊື່ບົດຮຽນ
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ລາຍລະອຽດ
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ຄະນະ
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ແກ້ໄຂ
                </th>
                <th className="px-6 py-3 bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                  ລົບ
                </th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lesson.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lesson.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{lesson.lab}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditLesson(lesson._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                    >
                      ແກ້ໄຂ
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteLesson(lesson._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2"
                    >
                      ລົບ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isLessonFormVisible && (
        <LessonForm
          lesson={selectedLesson}
          onClose={() => setIsLessonFormVisible(false)}
          onRefresh={() => {
            setIsLessonFormVisible(false);
            // Refresh lessons after form submission
            fetchLessons();
          }}
        />
      )}
    </>
  );
}

export default CourseManager;
