import { create } from "zustand";
type Book = {
  title: string;
  author: string;
  desc: string;
  coverurl: string;
  genre: string;
  rating: number;
  isLiked: boolean;
};
type BookStore = {
  staredBooks: Book[];
  addBookToStaredBooks: (book: Book) => void;
  removeBookFromStaredBooks: (book: Book) => void;
};

const bookStore = create<BookStore>((set) => ({
  staredBooks: [],
  addBookToStaredBooks: (book: Book) =>
    set((state) =>
      state.staredBooks.some((b: Book) => b.title === book.title)
        ? {}
        : { staredBooks: [...state.staredBooks, book] },
    ),
  removeBookFromStaredBooks: (book: Book) =>
    set((state) => ({
      staredBooks: state.staredBooks.filter((b) => b.title !== book.title),
    })),
}));

export default bookStore;
