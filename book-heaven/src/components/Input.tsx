import { useState } from "react";
interface InputProps {
    labelName:string;
    labelValue:string;
    type:string;
    placeholder:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({labelName,labelValue,type,placeholder,onChange}:InputProps) => {
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
        <div className="ml-12 mt-4">
            <div className="flex items-center justify-between w-[90%]">
        <label className="block ml-4 mb-1 text-xs" htmlFor={labelName}>{labelValue}</label>
     {type === "password" && labelName === "password" && <p className="text-xs text-blue-950 cursor-pointer">Forgot Password?</p>}
         </div>
         <div className="relative w-[95%] mx-auto">
        <input className="bg-stone-200 py-3 px-6 w-[95%]  h-14 rounded-lg gap-2 mx-auto" type={isTypePassword} placeholder={placeholder} onChange={onChange} />
        {type === "password" && labelName === "password" && <img className="text-xs text-blue-950 cursor-pointer absolute -translate-y-1/2 top-1/2 right-8 " onClick={handlePasswordVisibility} src={ishidden ? "hide.svg" : "show.svg"} alt="" />}
        </div>
        </div>
    )
}
export default Input