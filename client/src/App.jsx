import './App.css'
import { Routes, Route } from 'react-router-dom'
import Form from './Form.jsx'
function App() {
  console.log(import.meta.env.VITE_APP_BASE_URL)
  return (

    <>
      <Routes>
        <Route exact path='/' element={<Form />} />
        <Route exact path='/secret/:id' element={""} />
      </Routes>
    </>
  )
}

export default App
