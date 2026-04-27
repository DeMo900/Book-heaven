
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPassword from "./pages/ResetPassword"
import Navbar from "./components/Navbar"
import BottomNavBar from "./components/BottomNavBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
    //  <Route path="/nav" element={<Navbar />} />
      <Route path="/" element={<BottomNavBar />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
<Route path="/passwordreset" element={<ForgotPasswordPage />} />
<Route path="/update-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App ;