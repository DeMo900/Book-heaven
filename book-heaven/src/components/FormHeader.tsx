interface props{
  title:string;
  description:string;
  resetPassword?:boolean;
}
const FormHeader = ({title,description,resetPassword=false}: props) => {
    return (
        <div className="w-full">
            <h1 className=" w-full text-5xl text-[#1B3B5A] font-extrabold text-center">{title}</h1>
            <p className="text-center text-slate-500 mb-10">{description}</p>

          {!resetPassword &&  <a href="http://localhost:9000/auth/google"
  className="w-full flex mb-4 bg-stone-200 shadow-lg border-4 border-slate-300 items-center justify-center p-2 rounded-lg gap-2 cursor-pointer duration-300 hover:scale-105 transition-all hover:bg-slate-300"
>
  <img className="w-6" src="https://developers.google.com/identity/images/g-logo.png" alt="Google icon" />
  <p className="font-serif text-center font-bold">CONTINUE WITH GOOGLE</p>
</a>}
          {!resetPassword &&  <p className="text-center text-slate-500">OR WITH EMAIL</p>}
                
        </div>
    )
}

export default FormHeader