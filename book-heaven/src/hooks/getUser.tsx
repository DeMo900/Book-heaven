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
    role:string
},
setUser:(user:UserState["user"])=>void

}
const getUserState = create<UserState>((set)=>({
    user:{
        username:"",
        email:"",
        role:""
    },
    setUser:((user:UserState["user"])=>set({user})),

}))

export default getUserState