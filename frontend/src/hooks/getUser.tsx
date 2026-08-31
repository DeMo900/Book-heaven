import { create } from "zustand";

type User = {
  username: string;
  email: string;
  role: string;
};

type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
};

const getUserState = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/profile`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();

      set({
        user: data.user,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Something went wrong",
        loading: false,
      });
    }
  },
}));

export default getUserState;