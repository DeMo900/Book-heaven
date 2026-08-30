import Navbar from "../components/Navbar";
import BottomNavBar from "../components/BottomNavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, PlayIcon } from "lucide-react";
interface book {
  title: string;
  author: string;
  desc: string;
  coverurl: string;
  genre: string;
  publisyear: string;
  rating: string;
  isLiked: boolean;
  filename: string;
}
const bookPage = () => {
  const [book, setBook] = useState<book | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { title } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/book/${title}`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsLiked(data.isLiked);
        setBook(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  const handleLike = async () => {
    setIsLiked(!isLiked);
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/books?stared=${!isLiked}&title=${encodeURIComponent(title)}`,
      {
        method: "PUT",
        credentials: "include",
      },
    );
  };
  return (
    <>
      <Navbar isSearchHidden={true} title={book?.title} />
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 justify-center items-center md:items-start pt-32 pb-32 px-4 ">
        <div className="flex flex-col gap-4  ">
          <div className="relative md:w-full">
            <img
              className="w-[30vh] md:w-[160vh] h-[46vh] md:h-[90vh] object-cover rounded-xl hover:scale-100 hover:opacity-90 transition duration-600 cursor-pointer hover:shadow-2xl hover:shadow-black"
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${book?.coverurl}`}
              alt=""
            />
            <div className="absolute top-4 right-4 bg-stone-200 p-2 rounded-xl ">
              <Heart
                className={`w-6 h-6 text-black cursor-pointer ${isLiked ? "fill-black" : ""}`}
                onClick={handleLike}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="flex gap-2 items-center max-w-md justify-center">
            <div
              className={`flex-1 p-1 rounded-xl text-center text-xl bg-green-300/50 hover:bg-green-300 transition duration-200 cursor-pointer whitespace-nowrap`}
            >
              {book?.genre}
            </div>
            <div
              className={`flex-1 p-1 rounded-xl text-center text-xl bg-slate-300/50 hover:bg-green-300 transition duration-200 cursor-pointer whitespace-nowrap`}
            >
              {book?.publisyear}
            </div>
          </div>
          <h1 className="text-[#002542] text-4xl leading-16 md:text-6xl font-[Playfair_Display] font-bold mt-4 md:mb-2">
            {book?.title}
          </h1>
          <h3 className="text-slate-400  text-2xl font-[Playfair_Display] hover:text-slate-800 hover:font-bold cursor-pointer transition duration-400">
            Liked by {book?.rating} readers
          </h3>
          <h5 className="text-slate-500 italic mt-2 text-4xl font-[Playfair_Display]">
            {" "}
            By {book?.author}{" "}
          </h5>
          <div className="flex gap-4 mt-8  justify-center md:justify-start items-center">
            <button
              className="px-8 py-6 bg-[#002542] text-white rounded-md flex items-center justify-center gap-2 hover:bg-slate-500 transition duration-400 cursor-pointer"
              onClick={() =>
                (window.location.href = `${import.meta.env.VITE_BASE_URL}/uploads/${book?.filename}`)
              }
            >
              READ NOW <PlayIcon className="w-5 h-5" />{" "}
            </button>
            <button className=" bg-stone-200 text-[#002542] p-2 rounded-md flex items-center justify-center hover:bg-green-400/90 transition duration-400 cursor-pointer">
              <Heart
                className={`w-6 h-6 text-black cursor-pointer ${isLiked ? "fill-black" : ""}`}
                onClick={handleLike}
              />
            </button>
          </div>
          <div className="border-l-4 hidden md:block p-4 border-l-slate-500 w-full h-[24vh] mt-16 ">
            <h1 className="text-4xl mb-4 font-bold font-[playfair_Display] text-[#002542] ">
              Description
            </h1>
            <p> {book?.desc} </p>
          </div>
        </div>

        <div className="border-l-4 md:hidden block p-4 border-l-slate-500 w-full h-[24vh] mt-8 overflow-auto ">
          <h1 className="text-4xl mb-4 font-bold font-[playfair_Display] text-[#002542] ">
            Description
          </h1>
          <p> {book?.desc} </p>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
};

export default bookPage;
