"use client";

import { motion } from "framer-motion";

type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
}: FormFieldProps) => (
  <motion.div
    className="flex flex-col gap-1"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <label
      htmlFor={name}
      className="text-sm font-medium text-[#3D2C1F] font-lato tracking-wide"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={name}
      required
      className="px-3 py-2 rounded border border-[#6E5D4E] bg-[#FFFBF5] text-[#3D2C1F] font-merriweather text-sm focus:outline-none focus:border-[#8B735C] focus:ring-1 focus:ring-[#8B735C] placeholder:text-gray-400 transition duration-200"
    />
  </motion.div>
);
