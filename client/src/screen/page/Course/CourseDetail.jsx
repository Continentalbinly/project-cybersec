import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuthContext } from "../../../hook/useAuth";

function Lesson() {
  const { id } = useParams();
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const { userData, setUserData } = useAuthContext();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const [userPoints, setUserPoints] = useState(null);
  const navigate = useNavigate();

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

        // Fetch lessons by course ID
        const lessonsResponse = await axios.get(`/lesson/${id}`);
        if (lessonsResponse.data.success) {
          setLessons(lessonsResponse.data.lessons);
        } else {
          console.error(
            "Error fetching lessons:",
            lessonsResponse.data.message
          );
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLessonClick = async (lessonId) => {
    try {
      const response = await axios.get(`/lesson/detail/${lessonId}`);
      if (response.data.success) {
        setSelectedLesson(response.data.lesson);
      } else {
        console.error("Error fetching lesson details:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching lesson details:", error.message);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("@auth"));
      const token = authData?.token;
      const response = await axios.post(
        "/auth/submit-answer",
        {
          userId: userData._id,
          lessonId: selectedLesson._id,
          answer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert("Correct answer! Points added.");
        setUserPoints(response.data.user.point);
        window.location.reload();
      } else {
        alert("Incorrect answer. Try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Incorrect answer. Try again.");
      } else {
        alert("Error submitting answer.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="mb-5">
        <button
          onClick={handleBack}
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      </div>
      <div className="container mx-auto py-8">
        {course ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>
            <div className="flex">
              <div className="w-1/4 pr-8">
                <h2 className="text-xl font-semibold">ລາຍການບົດຮຽນ</h2>
                <hr />
                <br />
                {lessons.map((lesson) => (
                  <div key={lesson._id} className="mb-4">
                    <div
                      className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden"
                      onClick={() => handleLessonClick(lesson._id)}
                    >
                      <div className="px-2 py-3 flex flex-col">
                        <h3 className="text-lg text-gray-800 font-semibold">
                          {lesson.header}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedLesson ? (
                <div className="w-3/4">
                  <h2 className="text-xl font-semibold">ເນື້ອຫາ</h2>
                  <hr />
                  <br />
                  <h3 className="text-2xl font-bold">{selectedLesson.title}</h3>
                  {selectedLesson.description && (
                    <ul className="list-disc list-inside pt-5">
                      <li>{selectedLesson.description}</li>
                    </ul>
                  )}
                  {selectedLesson.examples &&
                    selectedLesson.examples.length > 0 && (
                      <div>
                        {selectedLesson.examples.map((exampleGroup, index) => (
                          <div key={index}>
                            {exampleGroup.example.map((example, subIndex) => (
                              <div key={subIndex}>
                                {example.title && (
                                  <p className="font-semibold pt-5">
                                    {example.title}
                                  </p>
                                )}
                                {example.explanations.map(
                                  (explanation, expIndex) => (
                                    <p key={expIndex} className="ml-4 pt-5">
                                      {explanation.explanation}
                                    </p>
                                  )
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  {selectedLesson.codes && selectedLesson.codes.length > 0 && (
                    <div>
                      {selectedLesson.codes.map((codeGroup, index) => (
                        <div key={index}>
                          {codeGroup.code.map((code, subIndex) => (
                            <div key={subIndex}>
                              {code.title && (
                                <p className="font-semibold pt-5">
                                  - {code.title}
                                </p>
                              )}
                              {code.explanations.map(
                                (explanation, expIndex) => (
                                  <div key={expIndex} className="ml-4 pt-5">
                                    <SyntaxHighlighter
                                      language="php"
                                      style={vscDarkPlus}
                                    >
                                      {explanation.explanation}
                                    </SyntaxHighlighter>
                                  </div>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedLesson.detailcode &&
                    selectedLesson.detailcode.length > 0 && (
                      <div className="pt-5">
                        {selectedLesson.detailcode.map((detail, index) => (
                          <p key={index}>*{detail.tittle}</p>
                        ))}
                      </div>
                    )}
                  <div className="pt-5">
                    {selectedLesson.lab && (
                      <p className="pt-3">
                        <strong>Lab ທົດລອງ:</strong>{" "}
                        <a href={selectedLesson.lab} className="underline">
                          {selectedLesson.lab}
                        </a>
                      </p>
                    )}
                    {selectedLesson.question && (
                      <p className="pt-3">
                        <strong>ກິດຈະກໍາ:</strong> {selectedLesson.question}
                      </p>
                    )}
                    {selectedLesson.lab && (
                      <div className="pt-3">
                        <strong>ຄຳຕອບ:</strong>
                        <input
                          value={answer}
                          onChange={handleAnswerChange}
                          className="w-full h-10 p-4 border rounded"
                          placeholder="Type your answer here..."
                        />
                        <button
                          onClick={handleAnswerSubmit}
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                          Submit Answer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-3/4">
                  <h2 className="text-xl font-semibold">
                    Select a lesson to view details
                  </h2>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>No course found</div>
        )}
      </div>
    </>
  );
}

export default Lesson;
