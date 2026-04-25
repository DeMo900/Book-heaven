import { useSearchParams } from "react-router-dom";
import FormHeader from "../components/FormHeader";
import FormFooter from "../components/FormFooter";
import Input from "../components/Input";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    useEffect( () => {
        const VerifyCode = async()=>{
       const res = await fetch(`http://localhost:9000/update-password?code=${code}`)
        const data = await res.json();
        if(data.error){
            setError(data.error);
        }else{
        setEmail(data.email)
        console.log(data.email)
        }
        }
        VerifyCode()
    },[code])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch("http://localhost:9000/update-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               password ,
               email
            }),
        });
        const data = await res.json();
        if(data.error){
            setError(data.error);
        }
        else{
            navigate("/login")
        }
    }
    return (
         <div className="min-h-screen flex items-center gap-16  justify-center">
            <img className="w-[400px] object-cover h-[600px] rounded-lg hidden md:block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI33--hJi9VAF0Xy-BUe2YgHVHqm_KquzheCYw53HrYRp_YBWDd9GLit5deD2_8wagm3fxlidMI6H-mU0pGZmoeZ7eYGJtQvkM16lq2kwc-8McZltxAfQUyFoR0YTugfZUQuQNUjWEB445THKxURUyJhfvMwqjPmtiuaO7REKs64OQPM4DQHvqgX_pFi2jrUo8g9jui537orZibbCo7cGfEfgmk2yg7-L65Rh7zsZowhcT4DxxZ2viCv8Uv1Y7zPYJd61-K9o8iHSy" alt="" />
        <form onSubmit={handleSubmit}>
     <FormHeader title="Reset Password" description="Create a new password and don't forget it again." resetPassword={true} />
     <Input type="password" labelName="newpassword" labelValue="NEW PASSWORD" placeholder="new password" onChange={(e) => setPassword(e.target.value)} name="newpassword"/>
     <FormFooter buttonText="Reset Password" instructions="" error={error}/>
     </form>
     </div>
    )
}
export default ResetPassword