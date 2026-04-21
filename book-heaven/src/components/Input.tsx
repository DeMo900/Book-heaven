
interface InputProps {
    labelName:string;
    labelValue:string;
    type:string;
    placeholder:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({labelName,labelValue,type,placeholder,onChange}:InputProps) => {
    return (
        <div className="ml-12 mt-4">
            <div className="flex items-center justify-between w-[90%]">
        <label className="block ml-4 mb-1 text-xs" htmlFor={labelName}>{labelValue}</label>
     {type === "password" && labelName === "password" && <p className="text-xs text-blue-950 cursor-pointer">Forgot Password?</p>}
         </div>
        <input className="bg-stone-200 py-3 px-6 w-[95%] h-14 rounded-lg gap-2 mx-auto" type={type} placeholder={placeholder} onChange={onChange} />
           
        </div>
    )
}
export default Input