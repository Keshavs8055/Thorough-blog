"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { upgradeToAuthor } from "@/lib/api";
import { useToast } from "@/utils/toast";
import { useAuth } from "@/utils/authStore";
import { useLoading } from "@/utils/loading";
import { AuthorRequestForm, presetExpertise } from "@/utils/types";

const defaultForm: AuthorRequestForm = {
  bio: "",
  avatar: null,
  expertise: [],
  website: "",
  twitter: "",
  linkedin: "",
  error: {
    avatar: false,
    bio: false,
    expertise: false,
    website: false,
    twitter: false,
    linkedin: false,
  },
};

export default function BecomeAuthorPage() {
  const showToast = useToast((state) => state.showToast);
  const user = useAuth((state) => state.user);
  const router = useRouter();
  const { isLoading, setLoading } = useLoading();

  const [form, setForm] = useState<AuthorRequestForm>(defaultForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [customTag, setCustomTag] = useState("");

  useEffect(() => {
    if (user?.avatar) {
      setPreview(user.avatar);
      setForm((prev) => ({ ...prev, avatar: user.avatar }));
    }
  }, [user?.avatar]);

  const isValidUrl = (url: string | undefined) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (field: keyof AuthorRequestForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      error: {
        ...prev.error,
        [field]:
          field === "bio" ? value.trim().length < 50 : !isValidUrl(value),
      },
    }));
  };

  const toggleExpertise = (tag: string) => {
    setForm((prev) => {
      const exists = prev.expertise.includes(tag);
      const updated = exists
        ? prev.expertise.filter((t) => t !== tag)
        : prev.expertise.length < 3
        ? [...prev.expertise, tag]
        : prev.expertise;

      return {
        ...prev,
        expertise: updated,
        error: { ...prev.error, expertise: updated.length < 1 },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      avatar: !form.avatar && !preview,
      bio: form.bio.trim().length < 50,
      expertise: form.expertise.length < 1,
      website: !isValidUrl(form.website),
      twitter: !isValidUrl(form.twitter),
      linkedin: !isValidUrl(form.linkedin),
    };

    const hasErrors = Object.values(errors).some((v) => v);

    if (hasErrors) {
      setForm((prev) => ({ ...prev, error: errors }));
      showToast("Please fill all required fields correctly.", "error");
      return;
    }

    setLoading(true);

    const response = await upgradeToAuthor(form);
    showToast(
      response.success
        ? "Request to become an author is sent."
        : "Error while processing your request.",
      response.success ? "success" : "error"
    );

    if (response.success) router.push("/profile");
    setLoading(false);
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (
      trimmed &&
      !form.expertise.includes(trimmed) &&
      form.expertise.length < 3
    ) {
      toggleExpertise(trimmed);
      setCustomTag("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-3xl mx-auto p-10 mt-10 rounded-xl bg-[#FFFBF5] border border-[#6E5D4E] shadow-[0px_2px_5px_rgba(0,0,0,0.05)] space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-center font-serif text-[#3D2C1F]">
        Become an Author
      </h1>

      <div
        className={`space-y-2 ${
          form.error.avatar ? "border border-[#C05746] p-2" : "p-2"
        }`}
      >
        <label className="block text-lg font-medium text-[#3D2C1F]">
          Profile Avatar *
        </label>
        {preview && (
          <Image
            src={preview}
            alt="Avatar Preview"
            width={100}
            height={100}
            className="rounded-full object-cover border border-[#6E5D4E]"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setForm((prev) => ({
                ...prev,
                avatar: file,
                error: { ...prev.error, avatar: false },
              }));
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="block w-full text-sm text-[#3D2C1F] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-[#6E5D4E] file:text-sm file:font-semibold file:bg-[#8B735C] file:text-[#FFFBF5] hover:file:bg-[#6B7F6B]"
        />
      </div>

      <div className="space-y-2 p-2">
        <label className="block text-lg font-medium text-[#3D2C1F]">
          Bio *
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about yourself as a writer (min 50 chars)..."
          className={`w-full p-3 rounded-md focus:outline-none text-[#3D2C1F] font-serif ${
            form.error.bio
              ? "border border-[#C05746]"
              : "border border-[#6E5D4E]"
          }`}
          value={form.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          required
        />
        <div className="text-sm text-right text-[#6E5D4E]">
          {form.bio.trim().length}/1000 characters
        </div>
      </div>

      <div
        className={`space-y-2 p-2 ${
          form.error.expertise ? "border border-[#C05746]" : ""
        }`}
      >
        <label className="block text-lg font-medium text-[#3D2C1F]">
          Expertise (Max 3) *
        </label>
        <div className="flex flex-wrap gap-2">
          {presetExpertise.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleExpertise(tag)}
              className={`px-3 py-1 rounded-full text-sm font-sans border border-[#6E5D4E] transition ${
                form.expertise.includes(tag)
                  ? "bg-[#8B735C] text-[#FFFBF5]"
                  : "bg-[#FFFBF5] text-[#3D2C1F] hover:bg-[#8B735C] hover:text-[#FFFBF5]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            placeholder="Add your own..."
            maxLength={20}
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            className="flex-grow border border-[#6E5D4E] px-3 py-1 rounded-l-md focus:outline-none text-[#3D2C1F]"
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="bg-[#8B735C] text-[#FFFBF5] px-4 py-1 rounded-r-md"
          >
            Add
          </button>
        </div>
        {!!form.expertise.length && (
          <div className="flex flex-wrap gap-2 mt-2">
            {form.expertise.map((tag) => (
              <span
                key={tag}
                className="bg-[#8B735C] text-[#FFFBF5] text-sm px-3 py-1 rounded-full font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["website", "twitter", "linkedin"].map((field) => (
          <input
            key={field}
            type="url"
            placeholder={`${
              field.charAt(0).toUpperCase() + field.slice(1)
            } (optional)`}
            className={`border px-3 py-2 rounded-md text-[#3D2C1F] ${
              form.error[field as keyof typeof form.error]
                ? "border-[#C05746]"
                : "border-[#6E5D4E]"
            }`}
            value={form[field as keyof AuthorRequestForm] as string}
            onChange={(e) =>
              handleInputChange(
                field as keyof AuthorRequestForm,
                e.target.value
              )
            }
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#8B735C] text-[#FFFBF5] py-3 rounded-md hover:bg-[#6B7F6B] transition"
      >
        Submit Author Request
      </button>
    </motion.form>
  );
}
