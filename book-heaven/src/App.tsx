
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPassword from "./pages/ResetPassword"
import HomePage from "./pages/HomePage"
import AddBook from "./pages/AddBookPage"
import BookPage from "./pages/Book"
import { Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
   <Route path="/" element={<HomePage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
<Route path="/passwordreset" element={<ForgotPasswordPage />} />
<Route path="/update-password" element={<ResetPassword />} />
<Route path="/add-book" element={<AddBook />} />
<Route path="/book/:title" element={<BookPage />} />
    </Routes>
  )
}

export default App ;