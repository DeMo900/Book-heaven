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
    <>  
        <div className="flex items-center justify-between w-[90%] md:w-full">  
            <label className="block self-start mt-4 text-xs" htmlFor={labelName}>{labelValue}</label>
            {type === "password" && labelName === "password" && showForgotPassword && 
            <a href="http://localhost:5173/passwordreset">
                <p className="text-xs text-blue-950 cursor-pointer hover:text-blue-700">Forgot Password?</p>
            </a>}
        </div>
        <div className="relative flex justify-center w-full">  
            <input className="bg-stone-200 py-3 px-6 w-[90%] md:w-full h-14 rounded-lg" 
                type={isTypePassword} placeholder={placeholder} onChange={onChange} name={labelName}/>
            {type === "password" && labelName === "password" && 
                <img className="absolute -translate-y-1/2 top-1/2 right-8 cursor-pointer" 
                    onClick={handlePasswordVisibility} 
                    src={ishidden ? "hide.svg" : "show.svg"} alt="" />}
        </div>
    </>
)
}
export default Input