import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Lesson() {
  const { id } = useParams();
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`/course/${id}`);
        if (response.data.success) {
          setCourse(response.data.course);
        } else {
          setError("Error fetching course: " + response.data.message);
        }
      } catch (error) {
        setError("Error fetching course: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseById();
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
              {/* <ul className="list-disc pl-4">
                {course.syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul> */}
            </div>
          </div>
          {/* Add more sections as needed */}
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </div>
  );
}

export default Lesson;
