import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import TaskForm from './pages/TaskForm'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/tasks/new" element={<TaskForm/>}></Route>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App