import FormHeader from "./FormHeader"
import Input from "./Input"
import FormFooter from "./FormFooter"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [step,setStep] = useState(2);
    const [error,setError] = useState("");
    const navigate = useNavigate()
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch("http://localhost:9000/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });
        const data = await res.json();
        console.log(data);
        if(data.error){
            setError(data.error);
        }
        setStep(2);
    }
    return (
        <div className="min-h-screen flex items-center gap-16  justify-center">
            <img className="w-[400px] object-cover h-[600px] rounded-lg hidden md:block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI33--hJi9VAF0Xy-BUe2YgHVHqm_KquzheCYw53HrYRp_YBWDd9GLit5deD2_8wagm3fxlidMI6H-mU0pGZmoeZ7eYGJtQvkM16lq2kwc-8McZltxAfQUyFoR0YTugfZUQuQNUjWEB445THKxURUyJhfvMwqjPmtiuaO7REKs64OQPM4DQHvqgX_pFi2jrUo8g9jui537orZibbCo7cGfEfgmk2yg7-L65Rh7zsZowhcT4DxxZ2viCv8Uv1Y7zPYJd61-K9o8iHSy" alt="" />
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-6">
        <FormHeader title="Forgot Password" description="Enter your email address to reset your password." />
      {step === 1 && <Input onChange={handleEmailChange} labelName="email" name="email" labelValue="EMAIL ADDRESS" type="email" placeholder="name@anthology.com" /> }
      {step === 2 && <Input onChange={handleEmailChange} labelName="otp" name="otp" labelValue="6-DIGITS-CODe" type="Number" placeholder="6-DIGITS-CODE" /> }
      {step === 3 && <Input onChange={handleEmailChange} labelName="password" name="password" labelValue="NEW-PASSWORD" type="password" placeholder="NEW-PASSWORD" /> }
        </div>
        </form>
        </div>
    )
}
export default ForgotPassword