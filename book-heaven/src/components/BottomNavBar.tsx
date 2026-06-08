import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {Library,Search,User,Star} from "lucide-react";

const BottomNavBar = () => {
  const location = useLocation();

  return (
    <div className="flex bg-stone-200 fixed items-center md:hidden justify-between bottom-0 w-full h-24">
      <Link to="/library" className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
        <Library className={`w-8 h-8 ${location.pathname === "/library" ? "text-green-400/50" : "text-[#486459]"}`} />
        <p className="text-[#486459] text-2xl">Library</p>
      </Link>
      <Link to="/" className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
        <Search className={`w-8 h-8 ${location.pathname === "/" ? "text-green-400/50" : "text-[#486459]"}`} />
        <p className="text-[#486459] text-2xl">Discover</p>
      </Link>
      <Link to="/profile" className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
        <User className={`w-8 h-8 ${location.pathname === "/profile" ? "text-green-400/50" : "text-[#486459]"}`} />
        <p className="text-[#486459] text-2xl">Profile</p>
      </Link>
      <Link to="/curated" className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
        <Star className={`w-8 h-8 ${location.pathname === "/curated" ? "text-green-400/50" : "text-[#486459]"}`} />
        <p className="text-[#486459] text-2xl">Curated</p>
      </Link>
    </div>
  );
};
export default BottomNavBar;
