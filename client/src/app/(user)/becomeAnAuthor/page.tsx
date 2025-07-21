"use client";

import { useEffect, useState } from "react";
import { upgradeToAuthor } from "@/lib/api";
import { useToast } from "@/utils/toast";
import Image from "next/image";
import { AuthorRequestForm, presetExpertise } from "@/utils/types";
import { useAuth } from "@/utils/authStore";
import { useRouter } from "next/navigation";

export default function BecomeAuthorPage() {
  const showToast = useToast((state) => state.showToast);
  const user = useAuth((state) => state.user);
  const router = useRouter();
  const [form, setForm] = useState<AuthorRequestForm>({
    bio: "",
    error: {
      avatar: false,
      bio: false,
      expertise: false,
      website: false,
      twitter: false,
      linkedin: false,
    },
    avatar: null,
    expertise: [],
    website: "",
    twitter: "",
    linkedin: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customTag, setCustomTag] = useState("");

  useEffect(() => {
    if (user?.avatar) {
      setPreview(user.avatar);
      setForm((prev) => ({ ...prev, avatar: user.avatar }));
    }
  }, [user?.avatar]);

  const toggleExpertise = (tag: string) => {
    setForm((prev) => {
      const already = prev.expertise.includes(tag);
      const updated = already
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

  const isValidUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlErrors = {
      website: !isValidUrl(form.website || ""),
      twitter: !isValidUrl(form.twitter || ""),
      linkedin: !isValidUrl(form.linkedin || ""),
    };

    const hasErrors =
      !(form.avatar || preview) ||
      form.bio.trim().length < 50 ||
      form.expertise.length < 1 ||
      Object.values(urlErrors).some((v) => v);

    setForm((prev) => ({
      ...prev,
      error: {
        avatar: !form.avatar,
        bio: form.bio.trim().length < 50,
        expertise: form.expertise.length < 1,
        ...urlErrors,
      },
    }));

    if (hasErrors) {
      showToast("Please fill all required fields correctly.", "error");
      return;
    }

    setLoading(true);
    const finalform = {
      bio: form.bio,
      expertise: form.expertise,
      website: form.website,
      twitter: form.twitter,
      linkedin: form.linkedin,
      error: form.error,
      avatar: form.avatar,
    };
    const res = await upgradeToAuthor(finalform);
    showToast(
      res.success
        ? "Request to become an author is sent."
        : "Error while processing your request.",
      res.success ? "success" : "error"
    );
    if (res.success) {
      router.push("/profile");
    }

    setLoading(false);
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 rounded-xl bg-white shadow-xl space-y-6 mt-10"
    >
      <h1 className="text-3xl font-semibold text-center">Become an Author</h1>

      {/* Avatar Upload */}
      <div
        className={`space-y-2 rounded p-2 ${
          form.error.avatar ? "border border-red-500" : ""
        }`}
      >
        <label className="block text-lg font-medium">Profile Avatar *</label>
        {preview && (
          <Image
            src={preview}
            alt="Avatar Preview"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setForm({
                ...form,
                avatar: file,
                error: { ...form.error, avatar: false },
              });
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="file-input"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2 p-2">
        <label className="block text-lg font-medium">Bio *</label>
        <textarea
          rows={4}
          placeholder="Tell us about yourself as a writer (min 50 chars)..."
          className={`w-full border p-3 rounded-md focus:outline-none ${
            form.error.bio ? "border-red-500" : "border-gray-300"
          }`}
          value={form.bio}
          onChange={(e) => {
            const bio = e.target.value;
            setForm({
              ...form,
              bio,
              error: { ...form.error, bio: bio.trim().length < 50 },
            });
          }}
          required
        />
        <div className="text-sm text-right text-gray-500">
          {form.bio.trim().length}/1000 characters
        </div>
      </div>

      {/* Expertise */}
      <div
        className={`space-y-2 p-2 ${
          form.error.expertise ? "border border-red-500" : ""
        }`}
      >
        <label className="block text-lg font-medium">Expertise (Max 3) *</label>
        <div className="flex flex-wrap gap-2">
          {presetExpertise.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleExpertise(tag)}
              className={`px-3 py-1 rounded-full text-sm border ${
                form.expertise.includes(tag)
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } hover:bg-primary hover:text-white transition-all duration-200`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            maxLength={20}
            placeholder="Add your own..."
            className="flex-grow border px-3 py-1 rounded-l-md focus:outline-none"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              const trimmed = customTag.trim();
              if (
                trimmed &&
                !form.expertise.includes(trimmed) &&
                form.expertise.length < 3
              ) {
                toggleExpertise(trimmed);
                setCustomTag("");
              }
            }}
            className="bg-black text-white px-4 py-1 rounded-r-md"
          >
            Add
          </button>
        </div>
        {form.expertise.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {form.expertise.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Optional Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="url"
          placeholder="Website (optional)"
          className={`border p-2 rounded-md ${
            form.error.website ? "border-red-500" : ""
          }`}
          value={form.website || ""}
          onChange={(e) =>
            setForm({
              ...form,
              website: e.target.value,
              error: {
                ...form.error,
                website: !isValidUrl(e.target.value),
              },
            })
          }
        />
        <input
          type="url"
          placeholder="Twitter (optional)"
          className={`border p-2 rounded-md ${
            form.error.twitter ? "border-red-500" : ""
          }`}
          value={form.twitter || ""}
          onChange={(e) =>
            setForm({
              ...form,
              twitter: e.target.value,
              error: {
                ...form.error,
                twitter: !isValidUrl(e.target.value),
              },
            })
          }
        />
        <input
          type="url"
          placeholder="LinkedIn (optional)"
          className={`border p-2 rounded-md ${
            form.error.linkedin ? "border-red-500" : ""
          }`}
          value={form.linkedin || ""}
          onChange={(e) =>
            setForm({
              ...form,
              linkedin: e.target.value,
              error: {
                ...form.error,
                linkedin: !isValidUrl(e.target.value),
              },
            })
          }
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
      >
        {loading ? "Submitting..." : "Submit Author Request"}
      </button>
    </form>
  );
}
