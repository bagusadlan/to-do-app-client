import axios from 'axios'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserContext } from '../contexts/UserContext'
import { Loader } from '../components'

function RegisterForm() {
  const [ready, setReady] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState('')
  const { setUser } = useUserContext()

  async function handleRegisterSubmit(e) {
    e.preventDefault()
    try {
      isSubmitDisabled = true
      setReady(false)
      const { data } = await axios.post('/register', registerForm)

      setUser(data?.data)
      setRedirect(true)
      // axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
      toast.success('Register successful!')
    } catch (error) {
      toast.error('Register failed!')
    } finally {
      isSubmitDisabled = true
      setReady(true)
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setRegisterForm({
      ...registerForm,
      [name]: value
    })
  }

  let isSubmitDisabled = !(registerForm.username && registerForm.email && registerForm.password)

  if (redirect) {
      return <Navigate to={'/to-do'} />
  }

  return ready ? (
    <div className="grow flex items-center justify-around">
      <div className="mb-16">
        <div className="text-4xl mb-4 text-center">Register</div>
        <form className="max-w-md mx-auto" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="mb-2"
            name="username"
            value={registerForm.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="your@email.com"
            className="mb-2"
            name="email"
            value={registerForm.email}
            onChange={handleInputChange}
          />
          <div className="flex relative items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="mb-2"
              name="password"
              value={registerForm.password}
              onChange={handleInputChange}
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
          <button
            className={`bg-primary w-full py-2 px-4 rounded-md text-white${
              isSubmitDisabled ? ' bg-disabled' : ' bg-primary'
            }`}
          >
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            {'Already a member? '}
            <Link to={'/login'} className="underline text-black">
              Register
            </Link>
          </div>
        </form>
        {errors && <p className="text-red-500 text-center">{errors}</p>}
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default RegisterForm
