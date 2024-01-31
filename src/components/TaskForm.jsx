import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: ''
  })

  function handleInputChange(e) {
    const { name, value } = e.target
    setTaskForm({
      ...taskForm,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(taskForm)
  }

  let isSubmitDisabled = !(taskForm.title && taskForm.description)

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-16">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="To Do Title"
            className="mb-2"
            name="title"
            value={taskForm.title}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Description"
            className="mb-2"
            name="description"
            value={taskForm.description}
            onChange={handleInputChange}
          />
          <button
            className={`w-full py-2 px-4 rounded-md text-white${
              isSubmitDisabled ? ' bg-disabled' : ' bg-blue-300'
            }`}
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
