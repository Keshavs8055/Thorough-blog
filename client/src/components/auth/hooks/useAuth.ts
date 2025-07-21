// // hooks/useAuth.ts
// import { useAuth as useZustandAuth } from "@/utils/authStore";

import { userLogin, userSignUp } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { LoginFormState, SignupFormState } from "@/utils/types";
import { useState } from "react";

// export const useAuth = () => {
//   const { user, login, logout } = useZustandAuth();

//   return {
//     user,
//     login,
//     logout,
//     isAuthenticated: !!user,
//   };
// };
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToast((state) => state.showToast);
  const { login } = useAuth();

  const handleAuth = async (
    form: LoginFormState | SignupFormState,
    isLogin: boolean
  ) => {
    try {
      setLoading(true);
      let result;

      if (isLogin) {
        result = await userLogin(form as LoginFormState);
        if (result.success && result.user && result.token) {
          login(result.user); // Set user in auth store
          showToast("Login successful!", "success");
        } else {
          showToast(result.message || "Login failed!", "error");
        }
      } else {
        const signupForm = form as SignupFormState;
        const formData = new FormData();

        Object.entries(signupForm).forEach(([key, val]) => {
          if (val) formData.append(key, val);
        });

        result = await userSignUp(formData);

        if (result.success) {
          showToast(result.message || "Signup successful!", "success");
          return { success: true, requiresVerification: true }; // Custom flag
        } else {
          showToast(result.message || "Signup failed!", "error");
        }
      }

      return result;
    } catch (err) {
      showToast("Unexpected error occurred", "error");
      console.error(err);
      return { success: false, message: "Unexpected error" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleAuth };
};
