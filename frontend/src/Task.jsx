import React, { useEffect, useState } from 'react';

function Task({ task, onToggle, onDelete }) {
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  
  useEffect(() => {
    setIsAnimatingIn(true);
    const timer = setTimeout(() => setIsAnimatingIn(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    setIsAnimatingOut(true);  
    setTimeout(() => {
      onDelete(task.id);  
    }, 500); 
  };

  return (
    <div className={`flex  justify-between items-center border p-2 my-2 rounded bg-white shadow-sm transition-all duration-500 
      ${isAnimatingIn ? 'animate-jump-in animate-duration-500' : ''}
      ${isAnimatingOut ? 'animate-jump-out animate-duration-500' : ''}
    `}>
      <span
       className={`flex-1 max-w-[80%] break-words whitespace-normal leading-6 text-justify ${
        task.completed ? "line-through text-gray-500" : "cursor-pointer text-gray-800"
      }`}
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Task;
