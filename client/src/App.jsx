import './App.css'
import { Routes, Route } from 'react-router-dom'
import Form from './Pages/Form.jsx'
import Secret from './Pages/Secret.jsx'
import { useEffect, useState } from 'react'
import Timer from './Pages/Timer.jsx'
import Lottie from "lottie-react";
import Animation from './assets/Animation.json'
import axios from 'axios'
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8700').then(res => {
      console.log(res)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])
  if (loading) {
    return (
      <div className='loading-screen'>
        <Lottie animationData={Animation} loop={true}  className='animation'/>
        <Timer />
        <p>Due to 15 min of inactivity the server went to sleeping mode please wait for 55 seconds while the serve restarts  </p>
      </div>)
  }
  return (

    <>
      <Routes>
        <Route exact path='/' element={<Form />} />
        <Route exact path='/secret/:id' element={< Secret />} />
      </Routes>
    </>
  )
}

export default App
