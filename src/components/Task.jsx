import { useState } from 'react'

function Task({ _id, title, description, status, setToTodo, setToOnGoing, setToDone, deleteTask }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  function handleToTodo(e) {
    e.preventDefault()
    setToTodo(_id)
  }

  function handleToOnGoing(e) {
    e.preventDefault()
    setToOnGoing(_id)
  }

  function handleToDone(e) {
    e.preventDefault()
    setToDone(_id)
  }

  function handleDeleteTask(e) {
    e.preventDefault()
    deleteTask(_id)
  }

  function styleStatusClass(status) {
    let statusClass

    switch (status) {
      case 'TODO':
        statusClass = ' bg-gray-300'
        break;
    
      case 'ONGOING':
        statusClass = ' bg-blue-200'
        break;
    
      case 'DONE':
        statusClass = ' bg-green-200'
        break;
    
      default:
        break;
    }
    return statusClass
  }

  return (
    // <div className="flex justify-between border px-4 py-2 rounded-md w-auto gap-4">
    //   <p className="truncate">{title}</p>
    // </div>
    <div className="border rounded-md p-4 mb-4">
      <div className={`flex justify-between cursor-pointer gap-4${isOpen ? ' items-start' : ' items-center'}`} onClick={toggleCollapse}>
        <h2 className={`text-lg font-semibold${status === 'DONE' ? ' line-through' : ''}${isOpen ? '' : ' truncate h-8'}`}>{title}</h2>
        <div className='flex gap-4 items-center'>
          <div className={`border-none px-3 py-1 h-8 rounded-md${styleStatusClass(status)}`}>{status}</div>
          <span className={`transform transition-transform -z-10 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
        </div>
      </div>
      {isOpen && (
        <>
          <div className="mt-4 mb-8">{description}</div>
          <div className="flex gap-4 justify-center">
          {status !== 'TODO' && (
            <button onClick={handleToTodo} className='flex gap-2 bg-gray-300 px-3 py-1 rounded-md items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
              </svg>
              <div>To Do</div>
            </button>
          )}
          {status !== 'ONGOING' && (
            <button onClick={handleToOnGoing} className='flex gap-2 bg-blue-300 px-3 py-1 rounded-md items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
              <div>On Going</div>
            </button>
          )}
          {status !== 'DONE' && (
            <button onClick={handleToDone} className='flex gap-2 bg-green-300 px-3 py-1 rounded-md items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
              <div>Done</div>
            </button>
          )}
            <button onClick={handleDeleteTask} className='flex gap-2 bg-red-300 px-3 py-1 rounded-md items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
              <div>Delete</div>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Task
