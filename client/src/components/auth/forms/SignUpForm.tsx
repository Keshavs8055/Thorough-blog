//signupForm.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { SignupFormState } from "@/utils/types";
import { FormField } from "./FormField";
import { redirect } from "next/navigation";
import { useToast } from "@/utils/toast";
import { useLogin } from "../hooks/useAuth";

const initialFormState: SignupFormState = {
  name: "",
  username: "",
  email: "",
  password: "",
  image: null,
};

export default function SignupForm() {
  const [form, setForm] = useState(initialFormState);
  const { loading, handleAuth } = useLogin();
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setForm((p) => ({ ...p, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleAuth(form, false);

    if (result.success) {
      showToast("Please verify your email before logging in.", "info");
      redirect("/login");
    }
  };

  return (
    <form
      encType="multipart/form-data"
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
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Avatar Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-black focus:border-black"
        />
      </div>
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
          className="text-black font-medium hover:underline no-underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
