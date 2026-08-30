import Navbar from "../components/Navbar";
import BottomNavBar from "../components/BottomNavBar";
import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
interface Book {
  title: string;
  author: string;
  coverurl: string;
  genre: string;
  rating: number;
  isLiked: boolean;
}
const CuratedPage = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [genre, setGenre] = useState("All");
  const [books, setbooks] = useState<Book[]>([]);
  const [AllBooks, setAllBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  async function fetchBooks() {
    const response = await fetch("http://localhost:9000/books", {
      credentials: "include",
    });
    const data = await response.json();
    const mappedArray = data.staredBooksArray.map((book: Book) => book.genre);
    const uniqueArray = [...new Set<string>(mappedArray)];
    setGenres(uniqueArray);
    if (data.staredBooksArray.length > 0) {
      setbooks(data.staredBooksArray);
      setAllBooks(data.staredBooksArray);
    }
  }
  //useEffect(()=>{
  //    fetchBooks()
  //  books.filter((book)=>( book.title.toLowerCase().includes(search.toLowerCase())))
  //},[search])
  useEffect(() => {
    fetchBooks();
  }, []);
  useEffect(() => {
    if (genre === "All") {
      setbooks(
        AllBooks.filter((book) =>
          book.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setbooks(
        AllBooks.filter(
          (book) =>
            book.genre === genre &&
            book.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search]);
  useEffect(() => {
    if (genre !== "All") {
      setbooks(AllBooks.filter((book) => book.genre === genre));
    } else {
      setbooks(AllBooks);
    }
    //  setbooks(AllBooks)
  }, [genre]);

  const handleBookLikeClick = async (title: string, newLiked: boolean) => {
    books.filter((book) => book.isLiked !== newLiked);

    await fetch(
      `http://localhost:9000/books?stared=${newLiked}&title=${encodeURIComponent(title)}`,
      {
        method: "PUT",
        credentials: "include",
      },
    );
  };
  return (
    <div>
      <Navbar
        isSearchHidden={false}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col w-full justify-start items-center pt-33">
        <div className="flex flex-col  gap-4 justify-start p-2 w-full">
          <h1 className="text-[#002542] text-4xl md:text-6xl">
            Your Curated Anthology
          </h1>
          <p className="text-[#486459] font-[Inter] text-xl leading-6 md:max-w-2xl md:leading-10 md:text-4xl">
            a personal collection of stories that resorate everytime here has
            been selected for its depth ,beauty and the way it lingers long
            after the last page
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center  mt-18 md:mt-20 p-2 w-full ">
          {genres.map((g, index) => (
            <div
              key={index}
              className={`text-[#486459] font-[Inter]  hover:text-[#002542] md:text-xl hover:bg-green-400/50 transition duration-300 cursor-pointer p-2 rounded-2xl md:mb-8 ${genre === g ? "bg-green-400/50" : " bg-stone-200"}`}
              onClick={() => {
                genre === g ? setGenre("All") : setGenre(g);
              }}
            >
              {g}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center md:justify-start md:p-4 items-center w-full py-4 ">
          {books
            .filter((book) =>
              book.title.toLowerCase().includes(search.toLowerCase()),
            )
            .map((book, index) => (
              <BookCard
                key={index}
                handleBookLikeClick={() =>
                  handleBookLikeClick(book.title, book.isLiked)
                }
                title={book.title}
                author={book.author}
                isLiked={true}
                image={`http://localhost:9000/uploads/${book.coverurl}`}
                onClick={() => {
                  window.location.href = `/book/${book.title}`;
                }}
              />
            ))}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default CuratedPage;
