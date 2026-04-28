import {Library,Search,User,Star} from "lucide-react";
const BottomNavBar = () => {
    return (
        <div className="flex bg-stone-200 fixed items-center md:hidden justify-between bottom-0 w-full h-24 ">
            <div className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
                <Library className="w-8 h-8 text-[#486459]" />
                <p className="text-[#486459] text-2xl">Library</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
                <Search className="w-8 h-8 text-[#486459]" />
                <p className="text-[#486459] text-2xl">Discover</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
                <User className="w-8 h-8 text-[#486459]" />
                <p className="text-[#486459] text-2xl">Profile</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full hover:bg-stone-300 transition-colors duration-200">
                <Star className="w-8 h-8 text-[#486459]" />
                <p className="text-[#486459] text-2xl">Curated</p>
            </div>
        </div>
    )
}
export default BottomNavBar;