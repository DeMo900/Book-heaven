import FormHeader from "./FormHeader"
import Input from "./Input"
import FormFooter from "./FormFooter"
import { useState } from "react"
const LoginForm = () => {
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [error,setError] = useState("");
   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
   }
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
   }
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("http://localhost:9000/signin", {
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
    if(data.errorr){
        setError(data.errorr);
    }
   }
    return (
        <form onSubmit={handleSubmit}>
        <FormHeader title="Welcome Back" description="Enter your credentials to access your library." />
        <Input onChange={handleEmailChange} labelName="email" labelValue="EMAIL ADDRESS" type="email" placeholder="name@anthology.com" />
        <Input onChange={handlePasswordChange} labelName="password" labelValue="PASSWORD" type="password" placeholder="••••••••" showForgotPassword={true}/>
        <FormFooter instructions="Don't have an account?" buttonText="ENTER HEAVEN" error="error"/>
        </form>
    )
}
export default LoginForm   