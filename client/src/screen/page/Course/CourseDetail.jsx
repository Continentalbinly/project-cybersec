import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function Lesson() {
  const { id } = useParams();
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
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
          <div className="flex">
            <div className="w-1/4 pr-8">
              <h2 className="text-xl font-semibold">Lessons</h2>
              <hr />
              <br />
              {lessons.map((lesson) => (
                <div key={lesson._id} className="mb-4">
                  <div
                    className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden"
                    onClick={() => handleLessonClick(lesson._id)}
                  >
                    <div className="px-3 py-4 flex flex-col">
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
                            {code.explanations.map((explanation, expIndex) => (
                              <div key={expIndex} className="ml-4 pt-5">
                                <SyntaxHighlighter
                                  language="php"
                                  style={vscDarkPlus}
                                >
                                  {explanation.explanation}
                                </SyntaxHighlighter>
                              </div>
                            ))}
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
                      <strong>ກິດຈະກຳ:</strong> {selectedLesson.question}
                    </p>
                  )}
                  <div className="pt-3 space-x-3">
                    <strong>ຄຳຕອບ:</strong> <input className="p-2" />
                    <button className="btn bg-blue-500 p-2 w-24 rounded h-auto">
                      ສົ່ງ
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-3/4 flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-500 text-lg mb-4">
                    Please select a lesson to see the details.
                  </p>
                  <img
                    src="https://img.freepik.com/free-vector/hand-student-holding-magnifying-glass-studying-books-stack-books-scientific-research-flat-vector-illustration-education-information-concept-banner-website-design-landing-page_74855-24720.jpg"
                    alt="Placeholder"
                    className="w-128 h-64 mx-auto mb-8"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </div>
  );
}

export default Lesson;
