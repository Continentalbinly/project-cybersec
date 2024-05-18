import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Lesson() {
  const { id } = useParams();
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course by ID
        const courseResponse = await axios.get(`/course/${id}`);
        if (courseResponse.data.success) {
          setCourse(courseResponse.data.course);
        } else {
          setError("Error fetching course: " + courseResponse.data.message);
        }
        // Fetch all lessons
        const response = await axios.get("/lesson/getlessons");
        if (response.data.success) {
          setLessons(response.data.lessons);
        } else {
          console.error("Error fetching lessons:", response.data.message);
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {course ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold">ລາຍລະອຽດ</h2>
              <hr />
              <br />
              <p>
                <strong>ຄຳອະທິບາຍ:</strong> {course.description}
              </p>
              <p>
                <strong>ໃຫ້ຂໍ້ມູນໂດຍ:</strong> {course.instructor}
              </p>
              <p>
                <strong>ໄລຍະເວລາຮຽນ:</strong> {course.duration}
              </p>
              <p>
                <strong>ພື້ນຖານ:</strong> {course.requirements}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">ບົດຮຽນ</h2>
              <hr />
              <br />
              {lessons.map((lesson) => {
                if (lesson.course_id === id) {
                  return (
                    <div
                      key={lesson._id}
                    >
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4 flex">
                        <div className="px-6 py-4 flex w-full flex-row justify-between items-center">
                          <div className="flex w-full">
                            <div>
                              <h3 className="text-lg text-gray-800 font-semibold">
                                {lesson.title}
                              </h3>
                            </div>
                            <div>
                              <p className="text-lg text-gray-600 pl-10">
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                          <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-600">
                            ຮຽນ
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </div>
  );
}

export default Lesson;
