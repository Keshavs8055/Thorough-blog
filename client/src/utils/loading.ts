import { create } from "zustand";

type AuthState = {
  isLoading: boolean;
  setLoading: (isloading: boolean) => void;
};

export const useLoading = create<AuthState>((set) => ({
  isLoading: false,
  setLoading: (loading) => {
    set(() => ({ isLoading: loading }));
  },
}));
