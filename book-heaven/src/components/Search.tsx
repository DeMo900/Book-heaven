
import {Search as SearchIcon} from "lucide-react";

const Search = ({onChange}) => {

return (
<div className="flex md:ml-24 shadow-lg w-[50%] md:w-[75%] bg-blue-200 justify-end rounded-2xl focus-within:ring-3 focus-within:ring-slate-300">
<SearchIcon className="w-8 p-1 text-slate-500 bg-[#F5F3EF] h-12 rounded-l-2xl " />
<input onInput={onChange} className="bg-[#F5F3EF] rounded-r-2xl w-full h-12 outline-none " type="text" placeholder="Search the collection"  />
</div>
    )
}

export default Search;
