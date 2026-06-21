import { create } from "zustand";
type Book = {
    title:string,
    author:string,
    coverurl:string,
    genre:string,
    rating:number,
    isLiked:boolean
}
type BookStore = {
    staredBooks:Book[]
    setStaredBooks:(books:Book[])=>void,
    addBookToStaredBooks:(book:Book)=>void,
    removeBookFromStaredBooks:(book:Book)=>void
}

const bookStore = create<BookStore>((set)=>({
    staredBooks:[],
    setStaredBooks:(books:Book[])=>set({staredBooks:books}),
    addBookToStaredBooks:(book:Book)=>set((state)=>({staredBooks:[...state.staredBooks,book]})),
    removeBookFromStaredBooks:(book:Book)=>set((state)=>({staredBooks:state.staredBooks.filter((b)=>b.title !== book.title)}))
}))

export default bookStore