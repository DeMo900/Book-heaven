interface FormFooterProps {
instructions:string;
buttonText:string;    
}

const FormFooter = ({instructions,buttonText}:FormFooterProps) => {
    return (
        <div className="ml-12 mt-4">
            <button className="bg-blue-950 block text-white py-3 px-6 w-[95%] h-14 rounded-lg gap-2 mx-auto cursor-pointer hover:px-10" type="submit">{buttonText}</button>
            <p className="text-center mt-4 mb-11 text-slate-500 cursor-pointer">{instructions}</p>
        </div>
    )
}
export default FormFooter;
