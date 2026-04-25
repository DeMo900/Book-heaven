interface FormFooterProps {
instructions:string;
buttonText:string;    
error?:string;
}

const FormFooter = ({instructions,buttonText,error}:FormFooterProps) => {
    return (
        <div>
        <p className="text-center text-red-500 cursor-pointer">{error}</p>
            <button className="bg-[#1B3B5A] block text-white w-full h-14 rounded-lg gap-2 p-2 cursor-pointer duration-300 hover:scale-105 transition-all hover:bg-[#1B3B5A]/90" type="submit">{buttonText}</button>
            <p className="text-center  text-slate-500 cursor-pointer">{instructions}</p>
        </div>
    )
}
export default FormFooter;
