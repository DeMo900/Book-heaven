import Navbar from "../components/Navbar";
import BottomNavBar from "../components/BottomNavBar";
const HomePage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className=" md:flex flex flex-col-reverse  md:flex-row justify-between pt-32 pb-24 px-10   ">
<div className="flex flex-col">
<h1 className="text-left text-[#486459] mt-16 md:mt-0 font-stretch-90% font-bold text-xl">Featured Narrative</h1>
<p className="text-[#002542] text-5xl leading-16 md:text-8xl font-[Playfair_Display] italic mt-4 font-medium md:mb-16">Whispers of the Ancient Willow</p>
<p className="text-[#486459] font-[Inter] text-md md:text-2xl md:max-w-2xl md:leading-10 mb-8"> A profound journey through the forgotten landscapes of Northern Europe, exploring the intersection of folklore and the silent resilience of nature. </p>
<div className="flex gap-4 ">
    <button className="bg-[#002542] text-white px-8 py-4 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">Read Now</button>
    <button className="bg-[#FBF9F5] text-[#002542] px-8 py-4 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">Add to library</button>
</div>
                </div>
                <img className="w-full md:w-[490px] border-l-4 border-l-amber-950 md:h-[110vh] h-[50vh] object-cover rounded-xl " src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdvVtcv-t591bg0OLVbjDha1eNlEjuxP1RnrQ9Bz4yk3Apfi5Xkvb4W52yO2-ZkyCFzkf3w3d4YJQvv22TReXXP1fWYpHR71sdvr7_43vukeyyLBTO5REK4xaW2_IJcCOHoPDrp_NFSeQGTnZPBkSEx9_DxnvNFhaDrV1okf6NxOaJFBU1ntiYYMG9j-b5uHuVZ1FUJMtMiDOorINX-nr__hMez8BDCN8h4Hd8uoFet5SrSdAZSH92fWpQwo8uE1mHDEHCE83geeFd" alt="" />
                </div>
            <BottomNavBar />
        </div>
    )
}
export default HomePage;