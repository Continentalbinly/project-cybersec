import React from "react";

const TaskListComponent = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="border p-2 rounded mb-2">
            <p>{task.question}</p>
            <div>
              <button
                onClick={() => onEdit(task)}
                className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskListComponent;
