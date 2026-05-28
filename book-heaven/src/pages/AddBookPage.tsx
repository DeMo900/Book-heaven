import { useRef, useState } from "react"
import Navbar from "../components/Navbar"
import FormFooter from "../components/FormFooter"
import BottomNavBar from "../components/BottomNavBar"
import Input from "../components/Input"
import {ImagePlus} from "lucide-react"
const AddBook = () =>{
    const [name,setName] = useState("")
    const [author,setAuthor] = useState("")
    const [desc,setDesc] = useState("")
    const [image,setImage] = useState(null)
    const [genre,setGenre] = useState("")
    const uploadimage  = useRef<HTMLInputElement>(null)
    return(
        <div>
            <Navbar onChange={(e)=>setName(e.target.value)} />
        <div className="pt-56 mx-auto max-w-3xl">
            <h1 className=" text-[#002542] font-[Inter] text-center md:text-left font-semibold text-5xl">Share your <span className=" text-[#486459] font-[playfair_display] text-5xl"> creative spirit </span>with the world.</h1>
            <p className="text-[#486459] font-[Inter] text-center md:text-left text-md max-w-lg mb-8 leading-6">
                your word deserve a home as elegant as the stories they tell,fill in the details below to begin the journey from manuscript to published anthology
            </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 ">
              <div className="border-transparent border-2 relative hover:border-[#002542] hover:bg-slate-500 transition duration-400 cursor-pointer rounded-md p-4 w-[250px] h-[350px] group bg-stone-200" onClick={()=>uploadimage.current?.click()}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-[#bef3db] text-[#002542] transition duration-300 flex flex-col gap-2 items-center w-full">
                    <ImagePlus  size={30} />
                <p >Upload cover image</p>
                </div>
                <input type="file" accept="image/*" className="hidden"  ref={uploadimage} onChange={(e)=>setImage(e.target.files![0])} />
                </div>
            <div className="flex flex-col max-w-xl w-[350px] md:w-[400px] h-[350px] justify-center gap-2 ">
             <Input labelName="TITLE OF THE WORK" labelValue="TITLE OF THE WORK" placeholder="e.g.The Midnight Library" type="text"></Input>
             <Input labelName="AUTHOR'S NAME" labelValue="THE AUTHOR" placeholder="e.g.Matt Haig" type="text"></Input>
             <Input labelName="UPLOAD BOOK" labelValue="UPLOAD BOOK" placeholder="PDF" type="file"></Input>
             <div className="flex justify-center gap-4 mt-4 items-center">
<div className={`w-24 p-2 rounded-2xl text-center text-xs hover:bg-green-300 transition duration-200 cursor-pointer ${genre === "Fantasy" ? "bg-green-400/50" : " bg-stone-200"}`} onClick={()=>setGenre("Fantasy")}>Fantasy</div>
<div className={`w-24 p-2 rounded-2xl text-center text-xs hover:bg-green-300 transition duration-200 cursor-pointer ${genre === "Fiction" ? "bg-green-400/50" : " bg-stone-200"}`} onClick={()=>setGenre("Fiction")}>Fiction</div>
<div className={`w-24 p-2 rounded-2xl text-center text-xs hover:bg-green-300 transition duration-200 cursor-pointer ${genre === "History" ? "bg-green-400/50" : " bg-stone-200"}`} onClick={()=>setGenre("History")}>History</div>
<div className={`w-24 p-2 rounded-2xl text-center text-xs hover:bg-green-300 transition duration-200 cursor-pointer ${genre === "Science" ? "bg-green-400/50" : " bg-stone-200"}`} onClick={()=>setGenre("Science")}>Science</div>
<div className={`w-24 p-2 rounded-2xl text-center text-xs hover:bg-green-300 transition duration-200 cursor-pointer ${genre === "Biography" ? "bg-green-400/50" : " bg-stone-200"}`} onClick={()=>setGenre("Biography")}>Biography</div>

             </div>
            </div>
            <div>
            </div>
            </div>
            <div className="flex flex-col justify-center bg-slate-300/40 w-fit md:w-[60%] md:p-2  md:max-w-4xl mx-auto mt-2 md:mt-16  ">
                <label htmlFor="description" className="block self-center md:self-start text-md md:pl-10">About the book</label>
                <textarea className="bg-stone-300 w-[90%] max-w-2xl mx-auto  md:max-w-4xl h-64 rounded-xl mt-4 p-4 focus:outline-none focus:ring-2 focus:ring-[#002542] focus:border-transparent" id="description" />
            </div>
            <div className="max-w-xs mx-auto mt-4 md:max-w-md pb-32">
            <FormFooter instructions="" buttonText="Publish anthology"/>

            </div>
            <BottomNavBar/>
        </div>
    )
}
export default AddBook