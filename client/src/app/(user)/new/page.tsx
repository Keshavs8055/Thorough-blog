"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/toast";
import { createPost } from "@/lib/api";
import Image from "next/image";
import { useAuth } from "@/utils/authStore";
import { motion } from "framer-motion";

const TiptapEditor = dynamic(() => import("@/components/editor/TipTapEditor"), {
  ssr: false,
});

const DRAFT_KEY = "postDraft";

type FormState = {
  title: string;
  image: File | null;
  previewImage: string;
};

const initialForm: FormState = {
  title: "",
  image: null,
  previewImage: "",
};

export default function NewPostPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const user = useAuth((state) => state.user);

  const [form, setForm] = useState<FormState>(initialForm);
  const [body, setBody] = useState("<p>Start writing your story...</p>");
  const [loading, setLoading] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user?.isAuthor) {
      showToast("You must be an author to create posts.", "error");
      router.push("/");
      return;
    }
    restoreDraft();
    setupUnloadWarning();
  }, [user?.isAuthor, router, showToast]);

  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ title: form.title, body })
      );
    }, 1000);
  }, [form.title, body]);

  const restoreDraft = () => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft);
      setForm((prev) => ({ ...prev, title: parsed.title }));
      setBody(parsed.body);
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  };

  const setupUnloadWarning = () => {
    const warn = (e: BeforeUnloadEvent) => {
      if (localStorage.getItem(DRAFT_KEY)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({
      ...prev,
      image: file,
      previewImage: file ? URL.createObjectURL(file) : "",
    }));
  };

  const validateForm = (): boolean => {
    if (form.title.length < 20) {
      showToast("Title must be at least 20 characters.", "error");
      return false;
    }
    if (body.replace(/<[^>]*>/g, "").length < 1000) {
      showToast("Post body must be at least 1000 characters.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("body", body);
    formData.append("date", new Date().toISOString());
    formData.append("summary", body.slice(0, 700));
    if (form.image) formData.append("image", form.image);

    setLoading(true);
    try {
      const res = await createPost(formData);
      if (res.success && res.data) {
        showToast("Post created successfully!", "success");
        localStorage.removeItem(DRAFT_KEY);
        router.push(`/posts/${res.data._id}`);
      } else {
        showToast("Failed to create post.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error creating post.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-[#FFFBF5] border border-[#6E5D4E] rounded-xl shadow-sm space-y-6 mt-10 font-serif"
      encType="multipart/form-data"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-center text-[#3D2C1F] font-display uppercase">
        Create a New Post
      </h1>

      <div>
        <label
          htmlFor="title"
          className="block text-sm text-[#3D2C1F] font-medium mb-1"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          required
          className="w-full border border-[#6E5D4E] rounded-md px-4 py-2 bg-[#FFFBF5] text-[#3D2C1F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B735C]"
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm text-[#3D2C1F] font-medium mb-1"
        >
          Featured Image
        </label>
        {form.previewImage && (
          <Image
            src={form.previewImage}
            alt="Preview"
            className="w-full h-60 object-cover rounded-md mt-2 mb-2 border border-[#6E5D4E] filter sepia"
            width={600}
            height={600}
          />
        )}
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mt-1 border border-[#6E5D4E] rounded-md px-3 py-2 bg-white text-[#3D2C1F]"
          required
        />
      </div>

      <div className="prose max-w-none">
        <TiptapEditor
          content={body}
          onContentChange={setBody}
        />
      </div>

      <div className="flex gap-4 items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/posts/preview")}
          className="w-full py-2 px-4 font-semibold text-[#3D2C1F] border border-[#6E5D4E] rounded-md hover:bg-[#EFE5DA] transition"
        >
          Preview Post
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 font-semibold bg-[#8B735C] text-[#FFFBF5] rounded-md hover:bg-[#6B7F6B] transition disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </motion.form>
  );
}
