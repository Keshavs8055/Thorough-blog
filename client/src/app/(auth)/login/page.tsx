"use client";
// app/login/page.tsx
import AuthLayout from "@/components/auth/layout/AuthLayout";
import LoginForm from "@/components/auth/forms/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
