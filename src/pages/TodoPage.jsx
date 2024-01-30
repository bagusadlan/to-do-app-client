import { useState } from 'react'
import { Loader, Task, TaskForm } from '../components'

function TodoPage() {
  const [ready, setReady] = useState(true)
  const [errors, setErrors] = useState('')

  async function addTask(taskForm) {
    try {
      setReady(false)
      await axios.post('/api/to-do', taskForm)
    } catch (error) {
      setErrors(error.response.data.message)
    } finally {
      setReady(true)
    }
  }

  return ready ? (
    <div className="grow flex pt-16 justify-around">
      <div className="mb-16">
        <div className="text-4xl mb-4 text-center">To Do</div>
        <TaskForm onAdd={addTask}/>
        <Task/>
        {errors && <p className="text-red-500 text-center">{errors}</p>}
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default TodoPage
