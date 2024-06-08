import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddLesson() {
  const { id } = useParams();
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
      {
        example: [
          {
            title: "",
            explanations: [{ explanation: "" }],
          },
        ],
      },
    ],
    codes: [
      {
        code: [
          {
            title: "",
            explanations: [{ explanation: "" }],
          },
        ],
      },
    ],
    detailcode: [{ title: "" }],
    images: [
      {
        image: [
          {
            title: "",
            urls: [{ url: "" }],
          },
        ],
      },
    ],
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (path, index, field, e) => {
    const newFormData = { ...formData };
    const [mainField, subField] = path.split(".");
    newFormData[mainField][index][subField][0][field] = e.target.value;
    setFormData(newFormData);
  };

  const handleExplanationChange = (path, mainIndex, subIndex, e) => {
    const newFormData = { ...formData };
    const [mainField, subField] = path.split(".");
    newFormData[mainField][mainIndex][subField][0].explanations[
      subIndex
    ].explanation = e.target.value;
    setFormData(newFormData);
  };

  const handleAddItem = (mainField, subField) => {
    const newFormData = { ...formData };
    newFormData[mainField].push({
      [subField]: [{ title: "", explanations: [{ explanation: "" }] }],
    });
    setFormData(newFormData);
  };

  const handleAddExplanation = (path, mainIndex) => {
    const newFormData = { ...formData };
    const [mainField, subField] = path.split(".");
    newFormData[mainField][mainIndex][subField][0].explanations.push({
      explanation: "",
    });
    setFormData(newFormData);
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

  const handleImageChange = (index, field, subIndex, e) => {
    const newImages = [...formData.images];
    if (field === "title") {
      newImages[index].image[0].title = e.target.value;
    } else if (field === "url") {
      newImages[index].image[0].urls[subIndex].url = e.target.value;
    }
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImage = () => {
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        { image: [{ title: "", urls: [{ url: "" }] }] },
      ],
    });
  };

  const handleAddImageURL = (mainIndex) => {
    const newImages = [...formData.images];
    newImages[mainIndex].image[0].urls.push({ url: "" });
    setFormData({ ...formData, images: newImages });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleExampleChange = (index, e) => {
    const newExamples = [...formData.examples];
    newExamples[index].example[0].title = e.target.value;
    setFormData({ ...formData, examples: newExamples });
  };

  const handleCodeChange = (index, e) => {
    const newCodes = [...formData.codes];
    newCodes[index].code[0].title = e.target.value;
    setFormData({ ...formData, codes: newCodes });
  };

  const handleCodeExplanationChange = (mainIndex, subIndex, e) => {
    const newCodes = [...formData.codes];
    newCodes[mainIndex].code[0].explanations[subIndex].explanation =
      e.target.value;
    setFormData({ ...formData, codes: newCodes });
  };

  const handleAddExample = () => {
    const newFormData = { ...formData };
    newFormData.examples.push({
      example: [
        {
          title: "",
          explanations: [{ explanation: "" }],
        },
      ],
    });
    setFormData(newFormData);
  };

  const handleAddCode = () => {
    const newFormData = { ...formData };
    newFormData.codes.push({
      code: [
        {
          title: "",
          explanations: [{ explanation: "" }],
        },
      ],
    });
    setFormData(newFormData);
  };

  const handleAddCodeExplanation = (mainIndex) => {
    const newFormData = { ...formData };
    newFormData.codes[mainIndex].code[0].explanations.push({ explanation: "" });
    setFormData(newFormData);
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
          {
            example: [
              {
                title: "",
                explanations: [{ explanation: "" }],
              },
            ],
          },
        ],
        codes: [
          {
            code: [
              {
                title: "",
                explanations: [{ explanation: "" }],
              },
            ],
          },
        ],
        detailcode: [{ title: "" }],
        images: [
          {
            image: [
              {
                title: "",
                urls: [{ url: "" }],
              },
            ],
          },
        ],
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
        {formData.images.map((image, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={`image-title-${index}`}
              className="text-lg font-medium"
            >
              Image Title:
            </label>
            <input
              type="text"
              id={`image-title-${index}`}
              value={image.image[0].title}
              onChange={(e) => handleImageChange(index, "title", 0, e)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {image.image[0].urls.map((urlObj, urlIndex) => (
              <div key={urlIndex} className="flex items-center space-x-2">
                <label
                  htmlFor={`image-url-${index}-${urlIndex}`}
                  className="text-lg font-medium"
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  id={`image-url-${index}-${urlIndex}`}
                  value={urlObj.url}
                  onChange={(e) => handleImageChange(index, "url", urlIndex, e)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddImageURL(index)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Add Image URL
            </button>
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Remove Image
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddImage}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Image
        </button>
        <div className="flex flex-col">
          <label htmlFor="lab" className="text-lg font-medium">
            ວິທີທົດສອບ:
          </label>
          <textarea
            id="lab"
            name="lab"
            value={formData.lab}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="question" className="text-lg font-medium">
            ຄຳຖາມ:
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="answer" className="text-lg font-medium">
            ຄຳຕອບ:
          </label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
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
          <div key={index} className="flex flex-col">
            <label
              htmlFor={`example-title-${index}`}
              className="text-lg font-medium"
            >
              Example Title:
            </label>
            <input
              type="text"
              id={`example-title-${index}`}
              value={example.example[0].title}
              onChange={(e) =>
                handleNestedChange("examples.example", index, "title", e)
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {example.example[0].explanations.map((exp, expIndex) => (
              <div key={expIndex} className="flex flex-col mt-2">
                <label
                  htmlFor={`example-explanation-${index}-${expIndex}`}
                  className="text-lg font-medium"
                >
                  Example Explanation:
                </label>
                <textarea
                  id={`example-explanation-${index}-${expIndex}`}
                  value={exp.explanation}
                  onChange={(e) =>
                    handleExplanationChange(
                      "examples.example",
                      index,
                      expIndex,
                      e
                    )
                  }
                  className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddExplanation("examples.example", index)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Add Explanation
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExample}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Example
        </button>
        {formData.codes.map((code, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={`code-title-${index}`}
              className="text-lg font-medium"
            >
              Code Title:
            </label>
            <input
              type="text"
              id={`code-title-${index}`}
              value={code.code[0].title}
              onChange={(e) =>
                handleNestedChange("codes.code", index, "title", e)
              }
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
            {code.code[0].explanations.map((exp, expIndex) => (
              <div key={expIndex} className="flex flex-col mt-2">
                <label
                  htmlFor={`code-explanation-${index}-${expIndex}`}
                  className="text-lg font-medium"
                >
                  Code Explanation:
                </label>
                <textarea
                  id={`code-explanation-${index}-${expIndex}`}
                  value={exp.explanation}
                  onChange={(e) =>
                    handleCodeExplanationChange(index, expIndex, e)
                  }
                  className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddCodeExplanation(index)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Add Explanation
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCode}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Code
        </button>
        {formData.detailcode.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={`detailcode-title-${index}`}
              className="text-lg font-medium"
            >
              Detail Code:
            </label>
            <input
              type="text"
              id={`detailcode-title-${index}`}
              value={detail.title}
              onChange={(e) => handleDetailCodeChange(index, e)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDetailCode}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Detail Code
        </button>
        {formData.error && (
          <p className="text-red-500 mt-4">{formData.error}</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddLesson;
