interface FormFooterProps {
instructions:string;
buttonText:string;    
error?:string;
}

const FormFooter = ({instructions,buttonText,error}:FormFooterProps) => {
      const getInstructions = () => {
         if(instructions === "login"){
            return <a href="/signup">Don't have an account?</a>
         }else if (instructions === "signup"){
            return <a href="/login">Already have an account?</a>
         } else{
            return <a href="/login">back to login</a>
         }  
        }
    return (
        <div>
        <p className="text-center text-red-500 cursor-pointer">{error}</p>
            <button className="bg-[#1B3B5A] block mb-4 text-white w-full h-14 rounded-lg gap-2 p-2 cursor-pointer duration-300 hover:scale-105 transition-all hover:bg-[#1B3B5A]/90" type="submit">{buttonText}</button>
            <p className="text-center text-slate-500 cursor-pointer hover:text-slate-700">{getInstructions()}</p>
        </div>
    )
}
export default FormFooter;
