// hooks/useSignup.ts
import { useState } from "react";
import { useToast } from "@/utils/toast";
import { SignupFormState } from "@/utils/types";
import { userSignUp } from "@/lib/api";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToast((state) => state.showToast);

  const handleSignup = async (form: SignupFormState) => {
    setLoading(true);
    const result = await userSignUp(form);

    if (result.success) {
      showToast("Sign up successful. Please verify your email.", "success");
    } else {
      showToast(result.message || "Something went wrong!", "error");
    }

    setLoading(false);
  };

  return { loading, handleSignup };
};
