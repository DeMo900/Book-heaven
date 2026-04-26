import FormHeader from "./FormHeader"
import Input from "./Input"
import FormFooter from "./FormFooter"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const LoginForm = () => {
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [error,setError] = useState("");
   const navigate = useNavigate()
   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
   }
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
   }
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const data = await res.json();
    console.log(data);
    if(data.error){
        setError(data.error);
    }else{
    navigate("/");
    }
   }
    return (
        <div className="min-h-screen flex items-center gap-16  justify-center">
            <img className="w-[400px] object-cover h-[600px] rounded-lg hidden md:block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI33--hJi9VAF0Xy-BUe2YgHVHqm_KquzheCYw53HrYRp_YBWDd9GLit5deD2_8wagm3fxlidMI6H-mU0pGZmoeZ7eYGJtQvkM16lq2kwc-8McZltxAfQUyFoR0YTugfZUQuQNUjWEB445THKxURUyJhfvMwqjPmtiuaO7REKs64OQPM4DQHvqgX_pFi2jrUo8g9jui537orZibbCo7cGfEfgmk2yg7-L65Rh7zsZowhcT4DxxZ2viCv8Uv1Y7zPYJd61-K9o8iHSy" alt="" />
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
        <FormHeader title="Welcome Back" description="Enter your credentials to access your library."/>
        <Input onChange={handleEmailChange} labelName="email" name="email" labelValue="EMAIL ADDRESS" type="email" placeholder="name@anthology.com" />
        <Input onChange={handlePasswordChange} labelName="password" name="password" labelValue="PASSWORD" type="password" placeholder="••••••••" showForgotPassword={true}/>
        <FormFooter instructions="login" buttonText="ENTER HEAVEN" error={error}/>
        </div>
        </form>
        </div>
    )
}
export default LoginForm   