
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPassword from "./pages/ResetPassword"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
<Route path="/passwordreset" element={<ForgotPasswordPage />} />
<Route path="/update-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App ;