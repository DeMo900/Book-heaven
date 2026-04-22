const FormHeader = ({title,description}: {title: string, description: string}) => {
    return (
        <>
        <div className="mx-auto mt-10">
            <h1 className="text-5xl text-blue-950 font-extrabold text-center">{title}</h1>
            <p className="text-center mt-4 mb-11 text-slate-500">{description}</p>
            <a href="http://localhost:9000/auth/google">
            <button className="flex bg-stone-200 items-center py-3 px-14 rounded-lg gap-2 mx-auto cursor-pointer">
                <img className="w-6" src="https://developers.google.com/identity/images/g-logo.png" alt="Google icon" />
                <p className="font-serif font-bold ">CONTINUE WITH GOOGLE</p>
            </button>
            </a>
            <p className="text-center mt-4 mb-11 text-slate-500">OR WITH EMAIL</p>
        </div>
        </>
    )
}

export default FormHeader