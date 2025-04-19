// stores/toastStore.ts
import { create } from "zustand";

type ToastType = "success" | "error" | "info";

type ToastState = {
  message: string;
  type: ToastType | null;
  visible: boolean;
  link: {
    link: string;
    label: string;
  };
  showToast: (
    message: string,
    type: ToastType,
    link?: { link: string; label: string },
    duration?: number
  ) => void;
  hideToast: () => void;
};

export const useToast = create<ToastState>((set) => ({
  message: "",
  type: null,
  visible: false,
  link: {
    label: "",
    link: "",
  },
  showToast: (message, type, link, duration = 3000) => {
    set({ message, type, visible: true, link });

    setTimeout(() => {
      set({ visible: false, message: "", type: null });
    }, duration);
  },

  hideToast: () => {
    set({ visible: false, message: "", type: null });
  },
}));
