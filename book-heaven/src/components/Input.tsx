import { useState } from "react";
interface InputProps {
    labelName:string;
    labelValue:string;
    type:string;
    placeholder:string;
    showForgotPassword?:boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name:string;
}

const Input = ({labelName,labelValue,type,placeholder,showForgotPassword=false,onChange,name}:InputProps) => {
    const [ishidden,setIsHidden] = useState(true);
    const [isTypePassword,setIsTypePassword] = useState(type);
    const handlePasswordVisibility = () => {
        setIsHidden(!ishidden);
        if(ishidden){
            setIsTypePassword("text");
        }else{
            setIsTypePassword("password");
        }
    }
    return (
    <div className="w-full">  
        <div className="flex items-center justify-between w-full">  
            <label className="block mt-4 text-xs" htmlFor={labelName}>{labelValue}</label>
            {type === "password" && labelName === "password" && showForgotPassword && 
            <a href="http://localhost:5173/passwordreset">
                <p className="text-xs text-blue-950 cursor-pointer">Forgot Password?</p>
            </a>}
        </div>
        <div className="relative w-full">  
            <input className="bg-stone-200 py-3 mb-4 px-6 w-full h-14 rounded-lg" 
                type={isTypePassword} placeholder={placeholder} onChange={onChange} name={labelName}/>
            {type === "password" && labelName === "password" && 
                <img className="absolute -translate-y-1/2 top-1/2 right-8 cursor-pointer" 
                    onClick={handlePasswordVisibility} 
                    src={ishidden ? "hide.svg" : "show.svg"} alt="" />}
        </div>
    </div>
)
}
export default Input