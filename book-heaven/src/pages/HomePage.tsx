import Navbar from "../components/Navbar";
import BottomNavBar from "../components/BottomNavBar";
import BookCard from "../components/BookCard";
import LoadingSquare from "../components/Loading";
import {useEffect,useState} from "react";
interface book {
    title :string,
    author : string,
    coverurl : string
}
const HomePage = () => {
  const [booksArray, setBooksArray] = useState<book[]>([]); 
  const [staredBooksArray, setStaredBooksArray] = useState([])
  const [isLoading,setLoading] = useState(false)
 useEffect(()=>{
(async()=>{
    try{
    setLoading(true)
const fetchBooks = await fetch("http://localhost:9000/books",{
    credentials:"include"
})
const response = await fetchBooks.json()

    setBooksArray(response.books)
setStaredBooksArray(response.staredBooksArray)
setLoading(false)

    }catch(error){
        console.log(error)
    }
})()
 },[])
 console.log(`starred books : ${staredBooksArray}`)
 console.log(`array in state:${booksArray}`)
    return (
        <div className="min-h-screen ">
            <Navbar />
            <div className=" md:flex flex flex-col-reverse  md:flex-row justify-between pt-32 pb-10 px-10   ">
<div className="flex flex-col">
<h1 className="text-left text-[#486459] mt-16 md:mt-0 font-stretch-90% font-bold text-xl">Featured Narrative</h1>
<p className="text-[#002542] text-5xl leading-16 md:text-8xl font-[Playfair_Display] italic mt-4 font-medium md:mb-16">Whispers of the Ancient Willow</p>
<p className="text-[#486459] font-[Inter] text-md md:text-2xl md:max-w-2xl md:leading-10 mb-8"> A profound journey through the forgotten landscapes of Northern Europe, exploring the intersection of folklore and the silent resilience of nature. </p>
<div className="flex gap-4 ">
    <button className="bg-[#002542] text-white px-8 py-4 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">Read Now</button>
    <button className="bg-[#FBF9F5] text-[#002542] px-8 py-4 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">Add to library</button>
</div>
                </div>
                <img className="w-full md:w-[490px] border-l-4 border-l-amber-950 md:h-[110vh] h-[50vh] object-cover rounded-xl " src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdvVtcv-t591bg0OLVbjDha1eNlEjuxP1RnrQ9Bz4yk3Apfi5Xkvb4W52yO2-ZkyCFzkf3w3d4YJQvv22TReXXP1fWYpHR71sdvr7_43vukeyyLBTO5REK4xaW2_IJcCOHoPDrp_NFSeQGTnZPBkSEx9_DxnvNFhaDrV1okf6NxOaJFBU1ntiYYMG9j-b5uHuVZ1FUJMtMiDOorINX-nr__hMez8BDCN8h4Hd8uoFet5SrSdAZSH92fWpQwo8uE1mHDEHCE83geeFd" alt="" />
                </div>
                <div className="flex flex-col gap-4 ml-4 ">
                    <h1 className="text-[#002542] font-[Playfair_Display] text-3xl">Explore Genres</h1>
                    <div className="flex flex-wrap justify-between ">
<div className="flex gap-2 items-center">
    <div className="text-[#486459] font-[Inter] text-md bg-stone-400/60 hover:bg-[#bef3db] hover:text-[#002542] transition-colors duration-300 cursor-pointer p-2 rounded-2xl mb-8">Poetry</div>
        <div className="text-[#486459] font-[Inter] text-md bg-stone-400/60 hover:bg-[#bef3db] hover:text-[#002542] transition-colors duration-300 cursor-pointer p-2 rounded-2xl mb-8 ">fiction</div>
    <div className="text-[#486459] font-[Inter] text-md bg-stone-400/60 hover:bg-[#bef3db] hover:text-[#002542] transition-colors duration-300 cursor-pointer p-2 rounded-2xl mb-8 ">history</div>
    <div className="text-[#486459] font-[Inter] text-md bg-stone-400/60 hover:bg-[#bef3db] hover:text-[#002542] transition-colors duration-300 cursor-pointer p-2 rounded-2xl mb-8 ">science</div>
    <div className="text-[#486459] font-[Inter] text-md bg-stone-400/60 hover:bg-[#bef3db] hover:text-[#002542] transition-colors duration-300 cursor-pointer p-2 rounded-2xl mb-8 ">biography</div>

</div>
<button className="bg-[#002542] text-white px-4 py-2 mr-8 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">Publish a Book</button>
                    </div>

                    <div className=" flex flex-wrap justify-center gap-4 md:justify-start pb-24">
                   {isLoading ? <LoadingSquare/> : booksArray.map((book, index) => (
  <BookCard key={index} image={"http://localhost:9000/uploads/" + book.coverurl} title={book.title} author={book.author} isLiked={staredBooksArray.some((el) => el.title === book.title)} />
))}

                                

            </div>
                </div>
            <BottomNavBar />
        </div>
    )
}
export default HomePage;