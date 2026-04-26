const Navbar = () => {
    return (
        <div className="flex p-6 gap-8 w-full h-12 bg-amber-200">
<h1 className="text-[#002542] text-4xl font-bold font-serif font-stretch-500"> Book Heaven </h1>
<ul className="flex gap-8">
    <a href="/"><li className="text-[#486459] text-2xl font-medium hover:opacity-80 transition-opacity duration-200">Library</li></a>
    <a href="/about"><li className="text-[#486459] text-2xl font-medium hover:opacity-80 transition-opacity duration-200">Discover</li></a>
    <a href="/contact"><li className="text-[#486459] text-2xl font-medium hover:opacity-80 transition-opacity duration-200">Cruated</li></a>
</ul>
        </div>
    )
}
export default Navbar;