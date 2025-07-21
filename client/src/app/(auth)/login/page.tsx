// app/login/page.tsx
import AuthLayout from "@/components/auth/layout/AuthLayout";
import LoginForm from "@/components/auth/forms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your account",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
