import FormHeader from "./FormHeader"
import Input from "./Input"
import FormFooter from "./FormFooter"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const signupForm = ()=>{
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate()
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch("http://localhost:9000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirmPassword,
            }),
        });
        const data = await res.json();
        console.log(data);
        if(data.error){
            setError(data.error);
        }
        navigate("/login");
    }
    return (
        <div className="min-h-screen flex w-full items-center gap-16 justify-center">
            <img className="w-[400px] object-cover h-[600px] rounded-lg hidden md:block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI33--hJi9VAF0Xy-BUe2YgHVHqm_KquzheCYw53HrYRp_YBWDd9GLit5deD2_8wagm3fxlidMI6H-mU0pGZmoeZ7eYGJtQvkM16lq2kwc-8McZltxAfQUyFoR0YTugfZUQuQNUjWEB445THKxURUyJhfvMwqjPmtiuaO7REKs64OQPM4DQHvqgX_pFi2jrUo8g9jui537orZibbCo7cGfEfgmk2yg7-L65Rh7zsZowhcT4DxxZ2viCv8Uv1Y7zPYJd61-K9o8iHSy" alt="" />
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col  items-center gap-4">
            <FormHeader title="Join the Heaven" description="Enter your details to create your account." />
            <Input onChange={handleNameChange} labelName="username" labelValue="NAME" type="text" placeholder="ex: John cena" name="username"/>
            <Input onChange={handleEmailChange} labelName="email" labelValue="EMAIL ADDRESS" type="email" placeholder="name@anthology.com" name="email"/>
            <Input onChange={handlePasswordChange} labelName="password" labelValue="PASSWORD" type="password" placeholder="••••••••" name="password"/>
            <Input onChange={handleConfirmPasswordChange} labelName="confirmPassword" labelValue="CONFIRM PASSWORD" type="password" placeholder="••••••••" showForgotPassword={false} name="confirmPassword"/>
            <FormFooter instructions="Already have an account?" buttonText="JOIN THE HEAVEN" error={error}/>
            </div>
        </form>
        </div>
    )
}
export default signupForm;