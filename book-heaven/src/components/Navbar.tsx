import Search from "./Search";
import { UserCircle,ArrowLeft } from "lucide-react";
import {useLocation} from "react-router-dom";
import { useEffect,useRef,useState } from "react";
interface props {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSearchHidden?: boolean;
    isBookPage?: boolean;
    title?:string;
}
const Navbar = ({onChange,isSearchHidden=false,isBookPage=false,title}:props) => {
    const height = useRef<number>(0); 
    const [isTopNavVisible,setIsTopNavVisible] = useState<boolean>(true);
    const location = useLocation();
useEffect(()=>{
const handleScrolling = ()=>{
    const scrolledDown = height.current - window.scrollY;
    console.log("scrolled down",scrolledDown);
    height.current = window.scrollY;
    if(scrolledDown < -20){
        setIsTopNavVisible(false)
    }
    else if(scrolledDown > 20 ){
        setIsTopNavVisible(true)
    }
}
window.addEventListener("scroll",handleScrolling);
return ()=>{
    window.removeEventListener("scroll",handleScrolling);
}
},[])
    return (
        <div className={`${location.pathname === "/add-book" ? "block" : "fixed"}  ${isTopNavVisible  ? "flex opacity-100 translate-y-0 scale-100 pointer-events-auto" : "hidden opacity-0 -translate-y-4 scale-95 pointer-events-none"} transition-all duration-350 ease-out transition-discrete  p-10 justify-between items-center gap-8 w-full h-12 starting:opacity-0 starting:-translate-y-4 starting:scale-95`}>
            <div className="flex justify-center gap-8 items-center">
 <ArrowLeft className="w-10 h-10 text-slate-700 hover:text-slate-500 transition-colors duration-200 block md:hidden" />
<h1 className={`text-[#002542] text-4xl shrink-0 font-bold font-serif hidden md:block font-stretch-500`}>Book Heaven</h1>
<h1 className={`text-[#002542] text-4xl shrink-0 font-bold md:hidden block font-serif font-stretch-500`}>{title}</h1>
  <ul className="hidden md:flex gap-2 md:gap-8 ">
    <a href="/library"><li className={`${location.pathname === "/library" ? "text-[#002542] font-bold border-b-black border-b-2": "text-slate-500 "} text-xl font-medium hover:opacity-80 transition-opacity duration-200`}>Library</li></a>
    <a href="/"><li className = {`${location.pathname === "/" ? "text-[#002542] font-bold border-b-black border-b-2": "text-slate-500 "} text-xl font-medium hover:opacity-80 transition-opacity duration-200`}>Discover</li></a>
    <a href="/cruated"><li className={`${location.pathname === "/cruated" ? "text-[#002542]" : "text-slate-500"} text-xl font-medium hover:opacity-80 transition-opacity duration-200`}>Cruated</li></a>
</ul> 

</div>
{isSearchHidden ? null : <Search onChange = {onChange} />}
<UserCircle className="w-10 h-10 text-slate-700 hover:text-slate-500 transition-colors duration-200 hidden md:block" />
        </div>
    )
}
export default Navbar;