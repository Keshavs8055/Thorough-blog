// app/signup/page.tsx
import AuthLayout from "@/components/auth/layout/AuthLayout";
import SignupForm from "@/components/auth/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
