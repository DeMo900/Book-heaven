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
useEffect(() => {
  height.current = window.scrollY; // add this line
  
  const handleScrolling = () => {
    const scrolledDown = height.current - window.scrollY;
    height.current = window.scrollY;
    if (scrolledDown < -15) {
      setIsTopNavVisible(false);
    } else if (scrolledDown > 15) {
      setIsTopNavVisible(true);
    }
  };

  window.addEventListener("scroll", handleScrolling,{passive:true});
  return () => {
    window.removeEventListener("scroll", handleScrolling);
  };
}, []);
const handleSearchClick = () => {
    setIsTopNavVisible(true);
     height.current = 10000;
    window.scrollTo({ top: 10000, behavior: "smooth" });
};
    return (
  <div className={`${location.pathname === "/add-book" ? "block" : "fixed"} z-50 flex p-10 justify-between items-center gap-8 w-full h-12`}>
    
    {/* Left section */}
    <div className={`flex justify-center gap-8 items-center transition-all duration-300 overflow-hidden shrink-0 ${
      isTopNavVisible ? "opacity-100 max-w-full" : "opacity-0 max-w-0 pointer-events-none"
    }`}>
      <ArrowLeft className="w-10 h-10 text-slate-700 hover:text-slate-500 transition-colors duration-200 block md:hidden" onClick={() => window.history.back()}/>
      <h1 className={`text-[#002542] text-4xl shrink-0 font-bold font-serif ${location.pathname !== "/book/:id" ? "block" : "hidden md:block"}`}>Book Heaven</h1>
      <h1 className="text-[#002542] text-4xl shrink-0 font-bold md:hidden block font-serif">{title}</h1>
      <ul className="hidden md:flex gap-2 md:gap-8">
        <a href="/library"><li className={`${location.pathname === "/library" ? "text-[#002542] font-bold border-b-black border-b-2" : "text-slate-500"} text-xl font-medium hover:opacity-80 transition-opacity duration-200`}>Library</li></a>
        <a href="/"><li className={`${location.pathname === "/" ? "text-[#002542] font-bold border-b-black border-b-2" : "text-slate-500"} text-xl font-medium hover:opacity-80 transition-opacity duration-200`}>Discover</li></a>
        <a href="/cruated"><li className={`${location.pathname === "/cruated" ? "text-[#002542]" : "text-slate-500"} text-xl font-medium hover:opacity-80 transition-opacity duration-200`}>Cruated</li></a>
      </ul>
    </div>

    {/* Search — expands and centers when nav collapses */}
    {!isSearchHidden && (
      <div className={`transition-all duration-300 w-full ${isTopNavVisible ? "flex-1" : "flex-1 flex justify-center"}`}>
        <Search onChange={onChange} onFocus={handleSearchClick} isTopNavVisible={isTopNavVisible} />
      </div>
    )}

    {/* User icon */}
    <div className={`transition-all duration-300 overflow-hidden shrink-0 ${
      isTopNavVisible ? "opacity-100 max-w-full" : "opacity-0 max-w-0 pointer-events-none"
    }`}>
      <UserCircle className="w-10 h-10 text-slate-700 hidden md:block  hover:text-slate-500 transition-colors duration-200" />
    </div>

  </div>
);  
}
export default Navbar;