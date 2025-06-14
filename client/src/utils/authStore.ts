import { create } from "zustand";
import { CompleteUser } from "@/utils/types";

type AuthState = {
  isLoggedIn: boolean;
  user: CompleteUser | null;
  login: (user: CompleteUser) => void;
  logout: () => void;
  setUser: (user: CompleteUser) => void;
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
