import React from "react";

const TaskListComponent = ({ tasks, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    console.log("No tasks available:", tasks);
    return <div>No tasks available.</div>;
  }

  console.log("Rendering tasks:", tasks);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{task.question}</h2>
          <ul>
            {task.answers.map((answerObj, index) => (
              <li key={index}>
                {answerObj.answer} {answerObj.correct && "(Correct)"}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <button
              onClick={() => onEdit(task)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskListComponent;
