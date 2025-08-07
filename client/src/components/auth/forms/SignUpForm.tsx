"use client";

import { useState } from "react";
import { FormField } from "./FormField";
import { redirect } from "next/navigation";
import { useToast } from "@/utils/toast";
import { SignupFormState, useAuthHook } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { SmartLink } from "@/components/common/smartLink";

const initialFormState: SignupFormState = {
  name: "",
  username: "",
  email: "",
  password: "",
  avatar: null,
};

export default function SignupForm() {
  const [form, setForm] = useState(initialFormState);
  const { loading, handleSignup } = useAuthHook();
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const maxSizeMB = 5;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (file.size > maxSizeBytes) {
        showToast(`Avatar image must be less than ${maxSizeMB}MB.`, "error");
        e.target.value = ""; // Clear the file input
        return;
      }

      setForm((p) => ({ ...p, avatar: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleSignup(form);

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
          htmlFor="avatar"
          className="block text-sm font-medium font-sans text-[#3D2C1F] mb-1"
        >
          Avatar Image
        </label>
        <input
          type="file"
          name="avatar"
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
        <SmartLink
          href="/login"
          className="text-[#8B735C] font-medium hover:underline"
        >
          Login
        </SmartLink>
      </div>
    </motion.form>
  );
}
