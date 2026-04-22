import FormHeader from "./FormHeader"
import Input from "./Input"
import FormFooter from "./FormFooter"
import { useState } from "react"
const signupForm = ()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
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
        const res = await fetch("https://localhost:9000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
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
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormHeader title="Join the Heaven" description="Enter your details to create your account." />
            <Input onChange={handleNameChange} labelName="name" labelValue="NAME" type="text" placeholder="name@anthology.com" />
            <Input onChange={handleEmailChange} labelName="email" labelValue="EMAIL ADDRESS" type="email" placeholder="name@anthology.com" />
            <Input onChange={handlePasswordChange} labelName="password" labelValue="PASSWORD" type="password" placeholder="••••••••" />
            <Input onChange={handleConfirmPasswordChange} labelName="confirmPassword" labelValue="CONFIRM PASSWORD" type="password" placeholder="••••••••" />
            <FormFooter instructions="Already have an account?" buttonText="JOIN THE HEAVEN" error={error}/>
        </form>
    )
}
export default signupForm;