import {create} from "zustand"
type userState ={
user:string,
setUser:(user:string)=>void
}
const getUserState = create<userState>((set)=>({
    user:"",
    setUser:((user:string)=>set({user:user}))
}))

export default getUserState