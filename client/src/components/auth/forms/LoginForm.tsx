"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FormField } from "./FormField";
import { LoginFormState, useAuthHook } from "../hooks/useAuth";
import { UserAuthenticatedResponse } from "../../../utils/globalTypes";
import { SmartLink } from "@/components/common/smartLink";

const initialFormState: LoginFormState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const { loading, handleLogin } = useAuthHook();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res: UserAuthenticatedResponse = await handleLogin(form);
    if (!res.success) {
      setError(res.message || "Unexpected Error Occurred");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6 bg-[#FFFBF5] border border-[#6E5D4E] p-10 rounded-xl shadow-[0px_2px_5px_rgba(0,0,0,0.05)]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-[#3D2C1F] font-playfair">
        Welcome Back 👋
      </h2>

      {error && (
        <div className="text-sm font-lato text-[#C05746] bg-[#fbeae8] border border-[#C05746] px-4 py-2 rounded-md text-center">
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
        className="w-full py-2 bg-[#8B735C] text-[#FFFBF5] hover:bg-[#6B7F6B] transition-all rounded-md font-lato font-semibold disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <SmartLink
        href="/signup"
        className="block no-underline"
      >
        <button
          type="button"
          className="w-full py-2 border border-[#6E5D4E] text-[#3D2C1F] hover:bg-[#F1EAE2] transition-all rounded-md font-lato font-medium"
        >
          Don&apos;t have an account? Sign Up
        </button>
      </SmartLink>
    </motion.form>
  );
}
