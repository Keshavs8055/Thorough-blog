"use client";

import Link from "next/link";
import { useState } from "react";
import { SignupFormState } from "@/utils/types";
import { FormField } from "./FormField";
import { redirect } from "next/navigation";
import { useToast } from "@/utils/toast";
import { useLogin } from "../hooks/useAuth";
import { motion } from "framer-motion";

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
    <motion.form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 p-8 bg-[#FFFBF5] border border-[#6E5D4E] shadow-sm rounded-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center font-serif text-[#3D2C1F]">
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
          className="block text-sm font-medium font-sans text-[#3D2C1F] mb-1"
        >
          Avatar Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full border border-[#6E5D4E] bg-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B735C] focus:border-[#8B735C]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 text-[#FFFBF5] bg-[#8B735C] font-semibold font-sans rounded-md hover:bg-[#6B7F6B] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="text-center text-sm text-[#6E5D4E] font-sans">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#8B735C] font-medium hover:underline"
        >
          Login
        </Link>
      </div>
    </motion.form>
  );
}
