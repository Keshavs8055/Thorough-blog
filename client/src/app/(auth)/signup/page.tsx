// app/signup/page.tsx
import AuthLayout from "@/components/auth/layout/AuthLayout";
import SignupForm from "@/components/auth/forms/SignUpForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
