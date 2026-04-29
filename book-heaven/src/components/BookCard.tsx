
import { useState } from "react";
import {Heart,HeartMinus} from "lucide-react";
interface BookCardProps{
    image:string;
    title:string;
    author:string;
    isLiked:boolean;
}
const BookCard = ({image,title,author,isLiked}:BookCardProps) => {
    const [Liked,setLiked] = useState(isLiked);
    return (
        <div className="flex flex-col w-[250px] group">
            <div className="relative">
                <img className="w-full h-[400px] object-cover rounded-xl " src={image} alt={title} />
                <div className="absolute top-2 left-[80%] opacity-45">
                    <div onClick={()=>setLiked(!Liked)} className="bg-white opacity-0 text-black h-10 w-8 p-1 py-2 rounded-lg group-hover:opacity-55 transition-opacity duration-800 cursor-pointer">{Liked ? <Heart className="fill-black" /> : <Heart />}</div>
                </div>
            </div>
            <h2 className="text-xl font-[Playfair_Display] text-[#002542] font-bold">{title}</h2>
            <p className="text-lg text-[#486459]">{author}</p>
        </div>
    )
}
export default BookCard;