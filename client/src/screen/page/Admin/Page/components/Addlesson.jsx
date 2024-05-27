import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddLesson() {
  const { id } = useParams(); // Retrieve the `id` parameter from the URL
  const navigate = useNavigate();
  axios.defaults.baseURL = "http://localhost:8080/api/v1";

  const [formData, setFormData] = useState({
    course_id: id,
    header: "",
    title: "",
    description: "",
    lab: "",
    question: "",
    answer: "",
    point: "",
    examples: [
      { example: [{ title: "", explanations: [{ explanation: "" }] }] },
    ],
    codes: [{ code: [{ title: "", explanations: [{ explanation: "" }] }] }],
    detailcode: [{ title: "" }],
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExampleChange = (index, e) => {
    const newExamples = [...formData.examples];
    newExamples[index].example[0].title = e.target.value;
    setFormData({ ...formData, examples: newExamples });
  };

  const handleExplanationChange = (exampleIndex, explanationIndex, e) => {
    const newExamples = [...formData.examples];
    newExamples[exampleIndex].example[0].explanations[
      explanationIndex
    ].explanation = e.target.value;
    setFormData({ ...formData, examples: newExamples });
  };

  const handleAddExample = () => {
    setFormData({
      ...formData,
      examples: [
        ...formData.examples,
        { example: [{ title: "", explanations: [{ explanation: "" }] }] },
      ],
    });
  };

  const handleAddExplanation = (exampleIndex) => {
    const newExamples = [...formData.examples];
    newExamples[exampleIndex].example[0].explanations.push({ explanation: "" });
    setFormData({ ...formData, examples: newExamples });
  };

  const handleCodeChange = (index, e) => {
    const newCodes = [...formData.codes];
    newCodes[index].code[0].title = e.target.value;
    setFormData({ ...formData, codes: newCodes });
  };

  const handleCodeExplanationChange = (codeIndex, explanationIndex, e) => {
    const newCodes = [...formData.codes];
    newCodes[codeIndex].code[0].explanations[explanationIndex].explanation =
      e.target.value;
    setFormData({ ...formData, codes: newCodes });
  };

  const handleAddCode = () => {
    setFormData({
      ...formData,
      codes: [
        ...formData.codes,
        { code: [{ title: "", explanations: [{ explanation: "" }] }] },
      ],
    });
  };

  const handleAddCodeExplanation = (codeIndex) => {
    const newCodes = [...formData.codes];
    newCodes[codeIndex].code[0].explanations.push({ explanation: "" });
    setFormData({ ...formData, codes: newCodes });
  };

  const handleDetailCodeChange = (index, e) => {
    const newDetailCodes = [...formData.detailcode];
    newDetailCodes[index].title = e.target.value;
    setFormData({ ...formData, detailcode: newDetailCodes });
  };

  const handleAddDetailCode = () => {
    setFormData({
      ...formData,
      detailcode: [...formData.detailcode, { title: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/lesson/createlesson", formData);
      console.log(response.data);
      setFormData({
        course_id: id,
        header: "",
        title: "",
        description: "",
        lab: "",
        question: "",
        answer: "",
        point: "",
        examples: [
          { example: [{ title: "", explanations: [{ explanation: "" }] }] },
        ],
        codes: [{ code: [{ title: "", explanations: [{ explanation: "" }] }] }],
        detailcode: [{ title: "" }],
        error: "",
      });
      alert("Lesson created successfully!");
      navigate(`/lessons/${id}`);
    } catch (error) {
      console.error("Error creating lesson:", error);
      setFormData({ ...formData, error: "Failed to create lesson" });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4">ສ້າງບົດຮຽນ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="header" className="text-lg font-medium">
            ຫົວຂໍ້:
          </label>
          <input
            type="text"
            id="header"
            name="header"
            value={formData.header}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium">
            ເນື້ອຫາ:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lab" className="text-lg font-medium">
            Lab:
          </label>
          <input
            type="text"
            id="lab"
            name="lab"
            value={formData.lab}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="question" className="text-lg font-medium">
            ຄຳຖາມ:
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="answer" className="text-lg font-medium">
            ຄຳຕອບ:
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="point" className="text-lg font-medium">
            ຄະແນນ:
          </label>
          <input
            type="number"
            id="point"
            name="point"
            value={formData.point}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        {formData.examples.map((example, index) => (
          <div key={index}>
            <div className="flex flex-col">
              <label
                htmlFor={`example-${index}`}
                className="text-lg font-medium"
              >
                ຕົວຢ່າງ:
              </label>
              <input
                type="text"
                id={`example-${index}`}
                name="example"
                value={example.example[0].title}
                onChange={(e) => handleExampleChange(index, e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="">
              <label
                htmlFor={`explanation-${index}`}
                className="text-lg font-medium"
              >
                ອະທິບາຍຕົວຢ່າງ:
              </label>
              {example.example[0].explanations.map((explanation, idx) => (
                <div key={idx} className="flex flex-col">
                  <textarea
                    type="text"
                    id={`explanation-${index}-${idx}`}
                    value={explanation.explanation}
                    onChange={(e) => handleExplanationChange(index, idx, e)}
                    className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddExplanation(index)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                ເພີ່ມອະທິບາຍ
              </button>
            </div>
          </div>
        ))}
        {formData.codes.map((code, index) => (
          <div key={index}>
            <div className="flex flex-col">
              <label htmlFor={`code-${index}`} className="text-lg font-medium">
                ໂຄ້ດ:
              </label>
              <input
                type="text"
                id={`code-${index}`}
                name="code"
                value={code.code[0].title}
                onChange={(e) => handleCodeChange(index, e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="">
              <label
                htmlFor={`code-explanation-${index}`}
                className="text-lg font-medium"
              >
                ລາຍລະອຽດໂຄ້ດ:
              </label>
              {code.code[0].explanations.map((explanation, idx) => (
                <div key={idx} className="flex flex-col">
                  <textarea
                    type="text"
                    id={`code-explanation-${index}-${idx}`}
                    value={explanation.explanation}
                    onChange={(e) => handleCodeExplanationChange(index, idx, e)}
                    className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddCodeExplanation(index)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                ເພີ່ມອະທິບາຍລະຫັດ
              </button>
            </div>
          </div>
        ))}
        {formData.detailcode.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={`detailcode-${index}`}
              className="text-lg font-medium"
            >
              ລາຍລະອຽດໂຄ້ດ:
            </label>
            <input
              type="text"
              id={`detailcode-${index}`}
              name="detailcode"
              value={detail.title}
              onChange={(e) => handleDetailCodeChange(index, e)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={handleAddExample}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            ເພີ່ມຕົວຢ່າງ
          </button>
          <button
            type="button"
            onClick={handleAddCode}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ml-4"
          >
            ເພີ່ມລະຫັດ
          </button>
          <button
            type="button"
            onClick={handleAddDetailCode}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 ml-4"
          >
            ເພີ່ມລາຍລະອຽດໂຄ້ດ
          </button>
        </div>
        {formData.error && <p className="text-red-500">{formData.error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          ສ້າງ
        </button>
      </form>
    </div>
  );
}

export default AddLesson;
