import { useState, useEffect } from 'react';
import Header from './Header';
import TaskForm from './TaskForm';
import Task from './Task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/quote')
      .then((res) => res.json())
      .then((data) => setQuote(data.quote))
      .catch(() => setQuote('Oops, something went wrong!'));

    fetch('http://localhost:3000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => console.log('Couldn’t load tasks'));
  }, []);

  const addTask = (taskText) => {
    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText }),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch(() => console.log('Couldn’t add task'));
  };

  const toggleTask = (id) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      })
      .catch(() => console.log('Couldn’t toggle task'));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch(() => console.log('Couldn’t delete task'));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Header title="My Task Tracker" />
      <p className="text-center italic text-gray-600 mb-4">
        {quote || 'Loading...'}
      </p>
      <TaskForm onAdd={addTask} />
      <div className="text-center">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;