import Navbar from "../components/Navbar"
import BottomNavBar from "../components/BottomNavBar";
import { useEffect,useState } from "react";
import {useParams} from "react-router-dom"
interface book {
    title :string,
    author : string,
    desc : string
    coverurl : string
}
const bookPage = () => {
    const [book,setBook] = useState<book | null>(null)
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
        <div>
            <Navbar isBookPage = {true} isSearchHidden = {true} title={"the book title "}/>
          <BottomNavBar/>
        </div>
    )
}

export default bookPage;