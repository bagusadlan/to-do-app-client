import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUserContext } from '../contexts/UserContext'
import { Loader, Task, TaskForm } from '../components'

function TodoPage() {
  const [ready, setReady] = useState(true)
  const { user } = useUserContext()
  const [tasks, setTasks] = useState([])
  // const [errors, setErrors] = useState('')
  useEffect(() => {
    if (user?.id) {
      fetchTasks()
    }
  }, [user?.id])

  async function fetchTasks() {
    try {
      setReady(false)
      const {data} = await axios.get('/to-do/' + user?.id)
        setTasks(data?.data)
    } catch (error) {
      console.log(error);
    } finally {
      setReady(true)
    }
  }

  async function addTask(taskForm) {
    try {
      setReady(false)
      await axios.post('/to-do', {
        userId: user?.id,
        ...taskForm
      })
      fetchTasks()
      toast.success('Successfully added the task!')
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message)
      toast.error('Failed create task!')
    } finally {
      setReady(true)
    }
  }

  async function setToTodo(id) {
    try {
      setReady(false)
      await axios.put('/to-do/todo/' + id)
      fetchTasks()
      toast.success('Successfully change status to todo!')
    } catch (error) {
      // setErrors(error.response.data.message)
      toast.error('Failed change task\'s status!')
    } finally {
      setReady(true)
    }
  }

  async function setToOnGoing(id) {
    try {
      setReady(false)
      await axios.put('/to-do/ongoing/' + id)
      fetchTasks()
      toast.success('Successfully change status to on going!')
    } catch (error) {
      // setErrors(error.response.data.message)
      toast.error('Failed change task\'s status!')
    } finally {
      setReady(true)
    }
  }

  async function setToDone(id) {
    try {
      setReady(false)
      await axios.put('/to-do/done/' + id)
      fetchTasks()
      toast.success('Successfully change status to done!')
    } catch (error) {
      // setErrors(error.response.data.message)
      toast.error('Failed change task\'s status!')
    } finally {
      setReady(true)
    }
  }

  async function deleteTask(id) {
    try {
      setReady(false)
      await axios.delete('/to-do/' + id)
      fetchTasks()
      toast.success('Successfully delete the task!')
    } catch (error) {
      // setErrors(error.response.data.message)
      toast.error('Failed change task\'s status!')
    } finally {
      setReady(true)
    }
  }

  return ready ? (
    <div className="grow flex pt-20 justify-around">
      <div className="mb-16 w-full sm:max-w-[459px]">
        <div className="text-4xl mb-4 text-center">To Do</div>
        <TaskForm onAdd={addTask}/>
        <div className='flex flex-col gap-2'>
          {tasks.length > 0 && tasks.map(task => (
            <Task key={task._id} {...task} setToTodo={setToTodo} setToOnGoing={setToOnGoing} setToDone={setToDone} deleteTask={deleteTask} />
          ))}
        </div>
        {/* {errors && <p className="text-red-500 text-center">{errors}</p>} */}
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default TodoPage
