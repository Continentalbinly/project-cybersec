import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AddCourse() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const { id } = useParams();
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    courseTitle: "",
    courseCode: "",
    description: "",
    instructor: "",
    duration: "",
    previewImage: "",
    requirements: "",
    permission: "",
  });

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`/course/${id}`);
        if (response.data.success) {
          const { course } = response.data;
          setNewCourse({
            courseTitle: course.courseTitle,
            courseCode: course.courseCode,
            description: course.description,
            instructor: course.instructor,
            duration: course.duration,
            previewImage: course.previewImage,
            requirements: course.requirements,
            permission: course.permission,
          });
        } else {
          console.error("Error fetching course:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    if (id) {
      fetchCourseById();
    }
  }, [id]);

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
      let response;
      if (id) {
        response = await axios.put(`/course/${id}`, newCourse); // Update course if ID exists
      } else {
        response = await axios.post("/course/createcourse", newCourse); // Add new course if no ID
      }
      if (response.data.success) {
        console.log("Course saved successfully:", response.data.course);
        alert("Course saved successfully!");
        navigate(-1);
      } else {
        console.error("Error saving course:", response.data.message);
        alert("Error saving course: " + response.data.message);
      }
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Error saving course: " + error.message);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {id ? "ແກ້ໄຂຄອດສ໌" : "ເພີ່ມຄອດສ໌"}
      </h1>
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
          <label htmlFor="permission" className="block mb-2">
            ສິດເຂົ້າເຖິງ:
          </label>
          <input
            type="text"
            id="permission"
            name="permission"
            value={newCourse.permission}
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
          {id ? "ອັບເດດ" : "ເພີ່ມ"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ml-4"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
