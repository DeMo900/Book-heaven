
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default App ;