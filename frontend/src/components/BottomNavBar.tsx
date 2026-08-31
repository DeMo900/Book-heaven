import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search, User, Star } from "lucide-react";

const BottomNavBar = () => {
  const location = useLocation();

  return (
    <div className="flex bg-stone-200 fixed items-center md:hidden justify-between bottom-0 w-full h-16 ">
      <Link
        to="/"
        className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200"
      >
        <Search
          className={`w-6 h-6 ${location.pathname === "/" ? "text-green-400/50" : "text-[#486459]"}`}
        />
        <p className="text-[#486459] text-xs">Discover</p>
      </Link>
      <Link
        to="/profile"
        className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200"
      >
        <User
          className={`w-6 h-6 ${location.pathname === "/profile" ? "text-green-400/50" : "text-[#486459]"}`}
        />
        <p className="text-[#486459] text-xs">Profile</p>
      </Link>
      <Link
        to="/curated"
        className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200"
      >
        <Star
          className={`w-6 h-6 ${location.pathname === "/curated" ? "text-green-400/50" : "text-[#486459]"}`}
        />
        <p className="text-[#486459] text-xs">Curated</p>
      </Link>
    </div>
  );
};
export default BottomNavBar;
