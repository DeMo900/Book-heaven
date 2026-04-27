import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
interface InputProps {
    labelName:string;
    labelValue:string;
    type:string;
    placeholder:string;
    showForgotPassword?:boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({labelName,labelValue,type,placeholder,showForgotPassword=false,onChange}:InputProps) => {
    const [ishidden,setIsHidden] = useState(true);
    return (
    <>  
        <div className="flex items-center  mt-4 justify-between w-[90%] md:w-full">  
            <label className="block self-start text-xs" htmlFor={labelName}>{labelValue}</label>
            {type === "password" && labelName === "password" && showForgotPassword && 
            <a href="/passwordreset">
                <p className="text-xs text-blue-950 cursor-pointer hover:text-blue-700">Forgot Password?</p>
            </a>}
        </div>
        <div className="relative flex justify-center w-full">  
            <input className="bg-stone-200 py-3 px-6 w-[90%] md:w-full h-14 rounded-lg" 
                type={ishidden ? type : "text"} placeholder={placeholder} onChange={onChange} name={labelName}/>
         {type === "password" && labelName === "password" && (
  ishidden 
    ? <EyeOff className="absolute -translate-y-1/2 top-1/2 right-8 cursor-pointer" onClick={() => setIsHidden(!ishidden)} /> 
    : <Eye className="absolute -translate-y-1/2 top-1/2 right-8 cursor-pointer" onClick={() => setIsHidden(!ishidden)} />
)}
        </div>
    </>
)
}
export default Input