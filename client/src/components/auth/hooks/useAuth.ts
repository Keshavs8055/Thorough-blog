import { useAuth as useZustandAuth } from "@/utils/authStore";

export const useAuth = () => {
  const { user, token, login, logout } = useZustandAuth();

  return {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
