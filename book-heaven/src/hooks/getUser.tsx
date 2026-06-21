import {create} from "zustand"
type Book ={
    title:string,
    author:string,
    coverurl:string,
    genre:string,
    rating:number,
    isLiked:boolean
}
type UserState = {
user:{
    username:string,
    email:string,
    lastViewedBooks:Book[]
},
setUser:(user:UserState["user"])=>void
setLastViewedBooks:(book:Book[])=>void

}
const getUserState = create<UserState>((set)=>({
    user:{
        username:"",
        email:"",
        lastViewedBooks:[]
    },
    setUser:((user:UserState["user"])=>set({user})),
    setLastViewedBooks:((books:Book[])=>set((state)=>({user:{...state.user,lastViewedBooks:books}})))

}))

export default getUserState