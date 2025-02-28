import React, { useState } from 'react'

function TaskForm({onAdd}) {

    const [task, setTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
      
        if(task){
            onAdd(task)
            setTask('')
        }
    }

  return (
    <form onSubmit={handleSubmit} className="text-center my-5">
        <input
         type="text"
         className="p-2 mr-3 border-gray-300 rounded"
         placeholder='Add a task'
         value={task}
         onChange={(e) => setTask(e.target.value)} 
         />
         <button type='submit'
         className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600' >Add</button>
    </form>
  )
}

export default TaskForm