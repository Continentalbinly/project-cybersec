import React, { useState, useEffect } from "react";
import axios from "axios";

const LessonForm = ({ lesson, onClose, onRefresh }) => {
  const [courseId, setCourseId] = useState("");
  const [header, setHeader] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lab, setLab] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [point, setPoint] = useState("");
  const [examples, setExamples] = useState([
    { example: [{ title: "", explanations: [{ explanation: "" }] }] },
  ]);
  const [codes, setCodes] = useState([
    { code: [{ title: "", explanations: [{ explanation: "" }] }] },
  ]);
  const [detailcode, setDetailcode] = useState([{ tittle: "" }]);

  useEffect(() => {
    if (lesson) {
      setCourseId(lesson.course_id);
      setHeader(lesson.header);
      setLessonTitle(lesson.title);
      setLessonContent(lesson.description);
      setLab(lesson.lab);
      setQuestion(lesson.question);
      setAnswer(lesson.answer);
      setPoint(lesson.point);
      setExamples(lesson.examples);
      setCodes(lesson.codes);
      setDetailcode(lesson.detailcode);
    }
  }, [lesson]);

  const handleExampleChange = (exampleIndex, exampleTitleIndex, value) => {
    const updatedExamples = [...examples];
    updatedExamples[exampleIndex].example[exampleTitleIndex].title = value;
    setExamples(updatedExamples);
  };

  const handleExplanationChange = (
    exampleIndex,
    exampleTitleIndex,
    explanationIndex,
    value
  ) => {
    const updatedExamples = [...examples];
    updatedExamples[exampleIndex].example[exampleTitleIndex].explanations[
      explanationIndex
    ].explanation = value;
    setExamples(updatedExamples);
  };

  const handleCodeChange = (codeIndex, codeTitleIndex, value) => {
    const updatedCodes = [...codes];
    updatedCodes[codeIndex].code[codeTitleIndex].title = value;
    setCodes(updatedCodes);
  };

  const handleCodeExplanationChange = (
    codeIndex,
    codeTitleIndex,
    explanationIndex,
    value
  ) => {
    const updatedCodes = [...codes];
    updatedCodes[codeIndex].code[codeTitleIndex].explanations[
      explanationIndex
    ].explanation = value;
    setCodes(updatedCodes);
  };

  const handleDetailCodeChange = (index, value) => {
    const updatedDetailCode = [...detailcode];
    updatedDetailCode[index].tittle = value;
    setDetailcode(updatedDetailCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lessonData = {
      course_id: courseId,
      header,
      title: lessonTitle,
      description: lessonContent,
      lab,
      question,
      answer,
      point,
      examples,
      codes,
      detailcode,
    };

    try {
      let response;
      if (lesson) {
        response = await axios.put(`/lesson/${lesson._id}`, lessonData);
      } else {
        response = await axios.post("/lesson/createlesson", lessonData);
      }
      if (response.data.success) {
        console.log("Lesson saved successfully:", response.data.lesson);
        onClose();
        onRefresh();
      } else {
        console.error("Error saving lesson:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
    }
  };

  return (
    <div className="pt-12 modal-overlay fixed bg-opacity-50 inset-0 flex items-center justify-center bg-gray-800">
      <div
        className="modal-container bg-white max-w-full w-full rounded-md p-6 overflow-y-auto"
        style={{ width: "80%", height: "90%" }}
      >
        <h2 className="text-xl font-semibold mb-4 text-black">
          {lesson ? "ແກ້ໄຂ" : "ເພີ່ມ"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="courseId"
              className="text-lg font-medium text-black"
            >
              Course ID:
            </label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="header" className="text-lg font-medium text-black">
              Header:
            </label>
            <input
              type="text"
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lessonTitle"
              className="text-lg font-medium text-black"
            >
              Lesson Title:
            </label>
            <input
              type="text"
              id="lessonTitle"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lessonContent"
              className="text-lg font-medium text-black"
            >
              Lesson Content:
            </label>
            <textarea
              id="lessonContent"
              value={lessonContent}
              onChange={(e) => setLessonContent(e.target.value)}
              className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="lab" className="text-lg font-medium text-black">
              Lab:
            </label>
            <input
              type="text"
              id="lab"
              value={lab}
              onChange={(e) => setLab(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="question"
              className="text-lg font-medium text-black"
            >
              Question:
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="answer" className="text-lg font-medium text-black">
              Answer:
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="point" className="text-lg font-medium text-black">
              Point:
            </label>
            <input
              type="number"
              id="point"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="examples"
              className="text-lg font-medium text-black"
            >
              Examples:
            </label>
            {examples.map((example, exampleIndex) => (
              <div key={exampleIndex} className="flex flex-col">
                {example.example.map((exampleDetail, exampleTitleIndex) => (
                  <div key={exampleTitleIndex} className="flex flex-col mt-2">
                    <input
                      type="text"
                      value={exampleDetail.title}
                      onChange={(e) =>
                        handleExampleChange(
                          exampleIndex,
                          exampleTitleIndex,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                      placeholder="Example Title"
                    />
                    {exampleDetail.explanations.map(
                      (explanation, explanationIndex) => (
                        <input
                          key={explanationIndex}
                          type="text"
                          value={explanation.explanation}
                          onChange={(e) =>
                            handleExplanationChange(
                              exampleIndex,
                              exampleTitleIndex,
                              explanationIndex,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mt-2"
                          placeholder="Explanation"
                        />
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedExamples = [...examples];
                        updatedExamples[exampleIndex].example[
                          exampleTitleIndex
                        ].explanations.push({
                          explanation: "",
                        });
                        setExamples(updatedExamples);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Add Explanation
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updatedExamples = [...examples];
                    updatedExamples[exampleIndex].example.push({
                      title: "",
                      explanations: [{ explanation: "" }],
                    });
                    setExamples(updatedExamples);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Add Example Detail
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setExamples([
                  ...examples,
                  {
                    example: [
                      { title: "", explanations: [{ explanation: "" }] },
                    ],
                  },
                ])
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Example
            </button>
          </div>
          <div className="flex flex-col">
            <label htmlFor="codes" className="text-lg font-medium text-black">
              Codes:
            </label>
            {codes.map((code, codeIndex) => (
              <div key={codeIndex} className="flex flex-col">
                {code.code.map((codeDetail, codeTitleIndex) => (
                  <div key={codeTitleIndex} className="flex flex-col mt-2">
                    <input
                      type="text"
                      value={codeDetail.title}
                      onChange={(e) =>
                        handleCodeChange(
                          codeIndex,
                          codeTitleIndex,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                      placeholder="Code Title"
                    />
                    {codeDetail.explanations.map(
                      (explanation, explanationIndex) => (
                        <input
                          key={explanationIndex}
                          type="text"
                          value={explanation.explanation}
                          onChange={(e) =>
                            handleCodeExplanationChange(
                              codeIndex,
                              codeTitleIndex,
                              explanationIndex,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mt-2"
                          placeholder="Explanation"
                        />
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedCodes = [...codes];
                        updatedCodes[codeIndex].code[
                          codeTitleIndex
                        ].explanations.push({
                          explanation: "",
                        });
                        setCodes(updatedCodes);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Add Explanation
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updatedCodes = [...codes];
                    updatedCodes[codeIndex].code.push({
                      title: "",
                      explanations: [{ explanation: "" }],
                    });
                    setCodes(updatedCodes);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Add Code Detail
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setCodes([
                  ...codes,
                  {
                    code: [{ title: "", explanations: [{ explanation: "" }] }],
                  },
                ])
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Code
            </button>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="detailcode"
              className="text-lg font-medium text-black"
            >
              Detail Code:
            </label>
            {detailcode.map((detail, index) => (
              <div key={index} className="flex flex-col mt-2">
                <input
                  type="text"
                  value={detail.tittle}
                  onChange={(e) =>
                    handleDetailCodeChange(index, e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  placeholder="Detail Code Title"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setDetailcode([...detailcode, { tittle: "" }])}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Detail Code
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {lesson ? "ອັບເດດ" : "ເພີ່ມ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonForm;
