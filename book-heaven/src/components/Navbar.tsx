import Search from "./search";
import { UserCircle } from "lucide-react";
const Navbar = () => {
    return (
        <div className="flex fixed p-10 items-center gap-8 w-full h-12 ">
<h1 className="text-[#002542]  text-4xl shrink-0 font-bold font-serif font-stretch-500"> Book Heaven </h1>
<ul className="hidden md:flex gap-2 md:gap-8">
    <a href="/"><li className="text-[#486459] text-2xl font-medium hover:opacity-80 transition-opacity duration-200">Library</li></a>
    <a href="/about"><li className="text-[#486459] text-2xl font-medium hover:opacity-80 transition-opacity duration-200">Discover</li></a>
    <a href="/contact"><li className="text-[#486459] text-2xl font-medium hover:opacity-80 transition-opacity duration-200">Cruated</li></a>
</ul>
<Search />
<UserCircle className="w-14 h-14 text-slate-700 hover:text-slate-500 transition-colors duration-200 hidden md:block" />
        </div>
    )
}
export default Navbar;