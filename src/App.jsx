import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Layout from './Layout'

import { RegisterPage, LoginPage, TodoPage } from './pages'

axios.defaults.baseURL = 'https://to-do-app-server-rose.vercel.app'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/to-do" element={<TodoPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
