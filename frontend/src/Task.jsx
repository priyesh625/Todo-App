import React from 'react'

function Task({ task, onToggle, onDelete }) {
  return (
    <div className="flex justify-between items-center border p-2 my-2 rounded bg-white shadow-sm">
      <span
        className={
          task.completed
            ? "line-through text-gray-500"
            : "cursor-pointer text-gray-800"
        }
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Task;
