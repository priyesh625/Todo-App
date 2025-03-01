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
    <form onSubmit={handleSubmit} className="text-center flex gap-5 justify-between my-5">
        <input
         type="text"
         className="p-4 text-lg border border-gray-300 rounded w-4/5 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"

         placeholder='Add a task'
         value={task}
         onChange={(e) => setTask(e.target.value)} 
         />
         <button type='submit'
                  className='p-2 bg-blue-500 w-1/5 text-white rounded hover:bg-blue-600' >Add</button>

          
    </form>
  )
}

export default TaskForm