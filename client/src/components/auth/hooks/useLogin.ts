// // hooks/useLogin.ts
// import { useToast } from "@/utils/toast";
// import { useState } from "react";
// import { useAuth } from "./useAuth";
// import { LoginFormState, SignupFormState } from "@/utils/types"; // Import both types
// import { userLogin, userSignUp } from "@/lib/api"; // Import both API functions

// export const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const showToast = useToast((state) => state.showToast);
//   const { login } = useAuth();

//   const handleAuth = async (
//     form: LoginFormState | SignupFormState,
//     isLogin: boolean
//   ) => {
//     setLoading(true);
//     let result;

//     if (isLogin) {
//       result = await userLogin(form as LoginFormState);
//       if (result.success && result.user && result.token) {
//         showToast("Login successful!", "success");
//         login(result.user);
//       } else {
//         showToast(result.message || "Login failed!", "error");
//       }
//     } else {
//       const signupForm = form as SignupFormState;

//       const formData = new FormData();
//       formData.append("name", signupForm.name);
//       formData.append("username", signupForm.username);
//       formData.append("email", signupForm.email);
//       formData.append("password", signupForm.password);
//       if (signupForm.image) {
//         formData.append("image", signupForm.image);
//       }

//       result = await userSignUp(formData);

//       if (result.success) {
//         showToast("Account created successfully!", "success");
//       } else {
//         showToast(result.message || "An unexpected error occurred!", "error");
//       }
//     }
//     setLoading(false);
//     return result;
//   };

//   return { loading, handleAuth };
// };
