import { userLogin, userSignUp } from "@/lib/api";
import { useAuth } from "@/utils/authStore";
import { useToast } from "@/utils/toast";
import { useState } from "react";
import {
  UserAuthenticatedResponse,
  CompleteUserResponse,
  InferResponse,
} from "../../../utils/globalTypes";

export interface LoginFormState {
  email: string;
  password: string;
}

export interface SignupFormState {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: File | null;
}

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToast((state) => state.showToast);
  const { login } = useAuth();

  const handleLogin = async (
    form: LoginFormState
  ): Promise<UserAuthenticatedResponse> => {
    try {
      setLoading(true);
      const result = await userLogin(form);

      if (result.success && result.data?.user && result.data?.token) {
        login(result.data.user);
        showToast("Login successful!", "success");
      } else {
        showToast(result.message || "Login failed!", "error");
      }

      return result;
    } catch (err) {
      console.error(err);
      showToast("Unexpected error occurred", "error");
      return {
        success: false,
        message: "Unexpected error",
      } as UserAuthenticatedResponse;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (
    form: SignupFormState
  ): Promise<InferResponse<CompleteUserResponse["data"]>> => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === "avatar" && val instanceof File) {
          formData.append("avatar", val);
        } else if (key !== "avatar" && val) {
          formData.append(key, val);
        }
      });

      const result = await userSignUp(formData);
      if (result.success) {
        showToast(
          result.message ||
            "Signup successful! Check Your email for verification.",
          "success"
        );
      } else {
        showToast(result.message || "Signup failed!", "error");
      }

      return result;
    } catch (err) {
      console.error("ERROR", err);
      showToast("Unexpected error occurred", "error");
      return { success: false, message: "Unexpected error" };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    handleSignup,
  };
};
