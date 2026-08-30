import Navbar from "../components/Navbar";
import BottomNavBar from "../components/BottomNavBar";
import BookCard from "../components/BookCard";
import LoadingSquare from "../components/Loading";
import getUserState from "../hooks/getUser";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "react-use";
import bookStore from "../hooks/book-store";
import { useNavigate } from "react-router-dom";
interface book {
  title: string;
  author: string;
  desc: string;
  coverurl: string;
  genre: string;
  rating: number;
  isLiked: boolean;
}
const HomePage = () => {
  const navigate = useNavigate();
  const addBookToStaredBooks = bookStore((s) => s.addBookToStaredBooks);
  const [booksArray, setBooksArray] = useState<book[]>([]);
  const [trendBook, setTrendBook] = useState<book | null>(null);
  const [staredBooksArray, setStaredBooksArray] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debaunceValue, setDebaunceValue] = useState("");
  const [genre, setGenre] = useState("");
  const user = getUserState((s) => s.user);

  useDebounce(() => setDebaunceValue(searchValue), 600, [searchValue]);
  const fetchAll = async () => {
    try {
      setLoading(true);
      const fetchBooks = await fetch(`${import.meta.env.VITE_BASE_URL}/books`, {
        credentials: "include",
      });
      const books = await fetchBooks.json();

      setBooksArray(books.books);
      setStaredBooksArray(books.staredBooksArray);
      setLoading(false);
      const fetchTrendBook = await fetch(`${import.meta.env.VITE_BASE_URL}/trend-book`, {
        credentials: "include",
      });
      const trendBook = await fetchTrendBook.json();
      setTrendBook(trendBook.book);
    } catch {}
  };
  useEffect(() => {
    if (searchValue === "") {
      fetchAll();
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const fetchSearchedBook = await fetch(
          `${import.meta.env.VITE_BASE_URL}/books/search?value=${encodeURIComponent(searchValue)}`,
          {
            method: "POST",
            credentials: "include",
          },
        );
        const response = await fetchSearchedBook.json();

        if (response.books.length !== 0) {
          setBooksArray(response.books);
          setTimeout(
            () => window.scrollTo({ top: 10000, behavior: "smooth" }),
            100,
          );
        } else {
          setBooksArray([]);
        }
        setStaredBooksArray(response.staredBooksArray);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, [debaunceValue]);
  const fetchStared = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/books`, {
      credentials: "include",
    });
    const data = await res.json();
    setStaredBooksArray(data.staredBooksArray);
  };
  const handleBookLikeClick = async (title: string, newLiked: boolean) => {
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/books?stared=${newLiked}&title=${encodeURIComponent(title)}`,
      {
        method: "PUT",
        credentials: "include",
      },
    );

    fetchStared();
  };
  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/books?genre=${genre}`, {
        credentials: "include",
      });
      const data = await res.json();

      setBooksArray(data.books);
      setStaredBooksArray(data.staredBooksArray);
    })();
  }, [genre]);
  const handleNavbarClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
    },
    [],
  );
  useEffect(() => {}, [user]);
  return (
    <div className="min-h-screen ">
      <Navbar onChange={handleNavbarClick} />
      <div className=" md:flex flex flex-col-reverse  md:flex-row justify-between pt-32 pb-10 px-10   ">
        <div className="flex flex-col">
          <h1 className="text-left text-[#486459] mt-16 md:mt-0 font-stretch-90% font-bold text-xl">
            Recomended
          </h1>
          <p className="text-[#002542] text-5xl leading-16 md:text-8xl font-[Playfair_Display] italic mt-4 font-medium md:mb-16">
            {trendBook?.title}
          </p>
          <p className="text-[#486459] font-[Inter] text-md md:text-2xl md:max-w-2xl md:leading-10 mb-8">
            {" "}
            {trendBook?.desc}{" "}
          </p>
          <div className="flex gap-4 ">
            <button className="bg-[#002542] text-white px-8 py-4 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">
              Read Now
            </button>
            <button className="bg-[#FBF9F5] text-[#002542] px-8 py-4 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">
              {staredBooksArray.some((book) => book.title === trendBook?.title)
                ? "View in library"
                : "Add to library"}
            </button>
          </div>
        </div>
        <img
          className="w-full md:w-122.5 border-l-4 border-l-amber-950 md:h-[110vh] h-[50vh] object-cover rounded-xl "
          src={`${import.meta.env.VITE_BASE_URL}/uploads/` + trendBook?.coverurl}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-4 ml-4 ">
        <h1 className="text-[#002542] font-[Playfair_Display] text-3xl">
          Explore Genres
        </h1>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            {[
              "All",
              "Fiction",
              "Non-Fiction",
              "Fantasy",
              "Science Fiction",
              "Romance",
              "Thriller",
              "Mystery",
              "Biography",
              "Self-Help",
              "History",
              "Poetry",
            ].map((g) => (
              <div
                key={g}
                className={`text-[#486459] font-[Inter] text-md hover:bg-[#bef3db] hover:text-[#002542] transition-colors duration-300 cursor-pointer p-2 rounded-2xl md:mb-8  ${genre === g ? "bg-green-400/50" : " bg-stone-200"}`}
                onClick={
                  g === "All"
                    ? () => setGenre("")
                    : () => setGenre(genre === g ? "" : g)
                }
              >
                {g}
              </div>
            ))}
          </div>
          <a href="/add-book" className="mb-8">
            <button className="bg-[#002542] text-white px-4 py-2 mr-8 rounded-xl text-lg hover:bg-slate-500 transition-colors duration-200">
              Publish a Book
            </button>
          </a>
        </div>

        <div className=" flex flex-wrap justify-center gap-4 md:justify-start pb-24">
          {isLoading ? (
            <LoadingSquare />
          ) : (
            booksArray.map((book, index) => (
              <BookCard
                key={index}
                handleBookLikeClick={handleBookLikeClick}
                image={`${import.meta.env.VITE_BASE_URL}/uploads/` + book.coverurl}
                title={book.title}
                author={book.author}
                isLiked={staredBooksArray.some((el) => el.title === book.title)}
                onClick={() => {
                  navigate(`/book/${book.title}`);
                  addBookToStaredBooks(book);
                }}
              />
            ))
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};
export default HomePage;
