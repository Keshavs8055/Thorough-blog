"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils/toast";
import { createPost } from "@/lib/api";
const TiptapEditor = dynamic(() => import("@/components/editor/TipTapEditor"), {
  ssr: false,
});

const DRAFT_KEY = "postDraft";

type formState = {
  title: string;
  image: File | null;
  previewImage: string;
};

export default function NewPostPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState<formState>({
    title: "",
    image: null,
    previewImage: "",
  });
  const [body, setBody] = useState("<p>Start writing your story...</p>");
  const [loading, setLoading] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Restore from draft
  useEffect(() => {
    const postData = localStorage.getItem(DRAFT_KEY);
    if (postData) {
      const { title, body } = JSON.parse(postData);
      setForm((prev) => ({ ...prev, title }));
      setBody(body || "<p>Start writing your story...</p>");
    }
  }, []);

  // Save to localStorage (debounced)
  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          title: form.title,
          body,
        })
      );
    }, 1000);
  }, [form.title, body]);

  // Warn on unload if draft exists
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));

    setForm((prev) => ({
      ...prev,
      previewImage: file ? URL.createObjectURL(file) : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.title.length < 20) {
      showToast("Title must be at least 20 characters.", "error");
      return;
    }
    if (body.replace(/<[^>]*>/g, "").length < 1000) {
      showToast("Post body must be at least 1000 characters.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("body", body);
    formData.append("date", new Date().toISOString());
    formData.append("summary", body.slice(0, 700));
    if (form.image) formData.append("image", form.image);

    setLoading(true);
    console.log(formData);

    try {
      const response = await createPost(formData);
      if (response.success && response.data) {
        showToast("Post created successfully!", "success");
        localStorage.removeItem(DRAFT_KEY);
        router.push(`/posts/${response.data._id}`);
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
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 mt-5"
      encType="multipart/form-data"
    >
      <h1 className="text-3xl font-bold text-center">Create a New Post</h1>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium"
        >
          Featured Image
        </label>
        {form.previewImage && (
          <img
            src={form.previewImage}
            alt="Preview"
            className="w-full h-60 object-cover rounded-md mt-2 mb-2"
          />
        )}
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <TiptapEditor
          content={body}
          onContentChange={setBody}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/posts/preview")}
          className="w-full py-2 px-4 font-semibold bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Preview Post
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 font-semibold bg-primary text-white rounded-md hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </form>
  );
}
