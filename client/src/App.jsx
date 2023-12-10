import './App.css'
import { Routes, Route } from 'react-router-dom'
import Form from './Pages/Form.jsx'
import Secret from './Pages/Secret.jsx'
function App() {
  return (

    <>
      <Routes>
        <Route exact path='/' element={<Form />} />
        <Route exact path='/secret/:id' element={<Secret />} />
      </Routes>
    </>
  )
}

export default App
