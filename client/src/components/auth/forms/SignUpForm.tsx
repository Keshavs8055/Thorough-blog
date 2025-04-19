"use client";

import Link from "next/link";
import { useState } from "react";
import { SignupFormState } from "@/utils/types";
import { useSignup } from "../hooks/useSignUp";
import { FormField } from "./FormField";

const initialFormState: SignupFormState = {
  name: "",
  username: "",
  email: "",
  password: "",
};

export default function SignupForm() {
  const [form, setForm] = useState(initialFormState);
  const { loading, handleSignup } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto animate-in fade-in duration-300"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        Create an Account
      </h2>

      <FormField
        label="Name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />
      <FormField
        label="Username"
        name="username"
        type="text"
        value={form.username}
        onChange={handleChange}
      />
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
        className="w-full py-2 font-medium bg-black text-white hover:bg-gray-900 transition-colors duration-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-black font-medium hover:underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
