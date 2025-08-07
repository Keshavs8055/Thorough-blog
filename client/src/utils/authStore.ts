import { create } from "zustand";
import { IUser } from "@/utils/globalTypes";

type AuthState = {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
};

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (user) =>
    set({
      isLoggedIn: true,
      user,
    }),

  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
    });
  },

  setUser: (user) => {
    set(() => ({ user }));
  },
}));
