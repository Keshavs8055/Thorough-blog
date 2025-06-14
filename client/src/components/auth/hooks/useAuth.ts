import { useAuth as useZustandAuth } from "@/utils/authStore";

export const useAuth = () => {
  const { user, login, logout } = useZustandAuth();

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
