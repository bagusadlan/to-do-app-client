import './App.css'
import { Route, Routes } from 'react-router-dom'

import Layout from './Layout'

import {
  RegisterPage,
  LoginPage
} from './pages'

function App() {
  return <>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
  </>
}

export default App
