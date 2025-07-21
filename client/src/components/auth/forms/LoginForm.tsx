// ./loginForm.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { LoginFormState } from "@/utils/types";
import { FormField } from "./FormField"; // Adjust path if needed
import { useLogin } from "../hooks/useAuth";

const initialFormState: LoginFormState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const { loading, handleAuth } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleAuth(form, true); // true = login
    if (!res.success) {
      setError("Unexpected Error Occured");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6 bg-white border border-gray-200 p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        Welcome Back 👋
      </h2>

      {error && (
        <div className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-md text-center">
          {error}
        </div>
      )}

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-black text-white hover:bg-gray-800 transition-all rounded-md font-medium disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <Link
        href="/signup"
        className="block no-underline"
      >
        <button
          type="button"
          className="w-full py-2 border border-black text-black hover:bg-black hover:text-white transition-all rounded-md font-medium"
        >
          Don&apos;t have an account? Sign Up
        </button>
      </Link>
    </form>
  );
}
