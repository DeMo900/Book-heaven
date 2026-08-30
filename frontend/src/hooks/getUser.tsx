import { create } from "zustand";

type UserState = {
  user: {
    username: string;
    email: string;
    role: string;
  };
  setUser: (user: UserState["user"]) => void;
};
const getUserState = create<UserState>((set) => ({
  user: {
    username: "",
    email: "",
    role: "",
  },
  setUser: (user: UserState["user"]) => set({ user }),
}));

export default getUserState;
