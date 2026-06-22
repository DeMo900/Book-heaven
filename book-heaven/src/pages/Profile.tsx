import Navbar from "../components/Navbar"
import BottomNavBar from "../components/BottomNavBar"
import getUserState from "../hooks/getUser"
import bookStore from "../hooks/book-store"
import BookCard from "../components/BookCard"
import { useNavigate } from "react-router-dom"
import { Mail } from "lucide-react"
const ProfilePage = () => {
const Navigate = useNavigate()
const user = getUserState((s)=>s.user)
const staredBooks = bookStore((s)=>s.staredBooks)

    return (
        <div>
            <Navbar isSearchHidden={true}/>
            <div className="flex flex-col w-full md:items-end px-4 items-center justify-center pt-33">
<div className="flex flex-col items-center md:items-end justify-center gap-4 ">
<h1 className="text-[#002542] font[Inter] font-semibold text-6xl">{user.username}</h1>
<p className="text-slate-950 font-[Inter] flex items-center gap-2"><Mail className="text-slate-600" size={20}/>{user.email} </p>
</div>
<div className="flex flex-col md:items-start md:p-2 md:gap-4 items-center w-full mt-8 ">
<h1 className="text-[#002542]  font[Inter]  font-semibold text-4xl my-2">Your Rotation</h1>
<div className="flex flex-col md:flex-row md:justify-start items-center  justify-center gap-4">
{staredBooks.map((book)=>{
    return(
        <BookCard key={book.title} title={book.title} author={book.author} image={`http://localhost:9000/uploads/${book.coverurl}`} handleBookLikeClick={()=>""} onClick={()=>Navigate(`/book/${book.title}`)} isLiked={book.isLiked}/>
    )
})}
</div>

</div>
            </div>
        <BottomNavBar/>
            
          
        </div>
    )
}

export default ProfilePage