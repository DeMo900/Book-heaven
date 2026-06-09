import Navbar from "../components/Navbar"
import BottomNavBar from "../components/BottomNavBar";
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
import { Heart,PlayIcon } from "lucide-react";
interface book {
    title :string,
    author : string,
    desc : string
    coverurl : string
}
const bookPage = () => {
    const [book,setBook] = useState<book | null>(null)
    const [isLiked,setIsLiked] = useState<boolean>(false)
    const {bookTitle} = useParams()
    useEffect(()=>{
        (async()=>{
            try{
                const res = await fetch(`http://localhost:9000/books/${bookTitle}`,{
                    credentials:"include"
                })
                const data = await res.json()
                setBook(data.book)
            }catch(err){
                console.log(err)
            }
        })()
    },[])
    return (
        
        <>
            <Navbar isBookPage = {true} isSearchHidden = {true} title={"the book title "}/>
<div className="flex flex-col gap-4 justify-center items-center pt-32 pb-32 px-4 ">
  <div className="flex flex-col gap-4 ">
    <div className="relative">
         <img className="w-[30vh] h-[56vh] object-cover rounded-xl" src={`http://localhost:9000/uploads/1780483978669-Screenshot From 2026-06-03 13-50-47.png`} alt="" />
         <div className="absolute top-4 right-4 bg-stone-200 p-2 rounded-xl ">
            <Heart className={`w-6 h-6 text-black cursor-pointer ${isLiked ? "fill-black" : ""}`} onClick={() => setIsLiked(!isLiked)} />
         </div>

    </div>
   
  </div>
<div className="flex flex-col">
    <div className="flex gap-2 items-center justify-center">
         <div className={`flex-1 p-4 rounded-xl text-center text-xl bg-green-300/50 hover:bg-green-300 transition duration-200 cursor-pointer whitespace-nowrap`}>Historical fiction</div>
         <div className={`flex-1 p-4 rounded-xl text-center text-xl bg-slate-300/50 hover:bg-green-300 transition duration-200 cursor-pointer whitespace-nowrap`}>30/6/2023</div>
    </div>
 <h1 className="text-[#002542] text-5xl leading-16 md:text-3xl font-[Playfair_Display] font-bold mt-4  md:mb-16"> Let's Go Explore The World</h1>
 <h5 className="text-slate-500 italic text-4xl font-[Playfair_Display]"> By kaya </h5> 
</div>
<div className="flex gap-4 mt-8 items-center">
    <button className="px-8 py-6 bg-[#002542] text-white rounded-md flex items-center justify-center gap-2">READ NOW <PlayIcon className="w-5 h-5"/> </button>
    <button className=" bg-stone-200 text-[#002542] p-2 rounded-md flex items-center justify-center"><Heart className={`w-6 h-6 text-black cursor-pointer ${isLiked ? "fill-black" : ""}`} onClick={() => setIsLiked(!isLiked)} /></button>
</div>
<div className="border-l-4  p-4 border-l-slate-500 w-full h-[24vh] mt-8 ">
    <h1 className="text-4xl mb-4 font-bold font-[playfair_Display] text-[#002542] ">
        Description
    </h1>
    <p> Description
        ssssssssssssssss
        ssssssssssssss
        sssssssssssssss
        sssssssssssssss
         </p>

</div>
</div>
          <BottomNavBar/>
        </>
    )
}

export default bookPage;