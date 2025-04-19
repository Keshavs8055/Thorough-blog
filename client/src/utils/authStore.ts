import { create } from "zustand";
import { AuthUser } from "@/utils/types";

type AuthState = {
  isLoggedIn: boolean;
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setUser: (user: AuthUser) => void;
};

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (user, token) =>
    set({
      isLoggedIn: true,
      user,
      token,
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      user: null,
      token: null,
    }),

  setUser: (user) => set(() => ({ user })),
}));
