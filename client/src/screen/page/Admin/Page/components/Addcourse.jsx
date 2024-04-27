import React, { useState } from "react";
import axios from "axios";

function AddCourse() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [newCourse, setNewCourse] = useState({
    courseTitle: "",
    courseCode: "",
    description: "",
    instructor: "",
    duration: "",
    previewImage: "",
    requirements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/course/createcourse", newCourse);
      if (response.data.success) {
        console.log("Course created successfully:", response.data.course);
        setNewCourse({
          courseTitle: "",
          courseCode: "",
          description: "",
          instructor: "",
          duration: "",
          previewImage: "",
          requirements: "",
        });
        // Show success message using alert
        alert("Course created successfully!");
      } else {
        console.error("Error creating course:", response.data.message);
        // Show error message using alert
        alert("Error creating course: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      // Show error message using alert
      alert("Error creating course: " + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">ເພີ່ມຄອດສ໌</h1>
      <form onSubmit={handleAddCourse} className="space-y-4">
        <div>
          <label htmlFor="courseTitle" className="block mb-2">
            ຫົວຂໍ້:
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            value={newCourse.courseTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="courseCode" className="block mb-2">
            ລະຫັດຄອດສ໌:
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={newCourse.courseCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="instructor" className="block mb-2">
            ສ້າງໂດຍ:
          </label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={newCourse.instructor}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block mb-2">
            ເວລາໃນການຮຽນ:
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={newCourse.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="previewImage" className="block mb-2">
            ຮູບປົກ:
          </label>
          <input
            type="text"
            id="previewImage"
            name="previewImage"
            value={newCourse.previewImage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="requirements" className="block mb-2">
            ທັດສາທີ່ຕ້ອງມີ:
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={newCourse.requirements}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            ຄຳອະທິບາຍເພີ່ມ:
          </label>
          <textarea
            id="description"
            name="description"
            value={newCourse.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
