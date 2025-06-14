"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CompleteUser, presetExpertise } from "@/utils/types";
import { useAuth } from "@/utils/authStore";
import { fetchCompleteUserData, updateUserProfile } from "@/lib/api";
import { useToast } from "@/utils/toast";

export interface UpdateForm extends CompleteUser {
  newImage?: string | File | null;
}

const EditProfilePage = () => {
  const id = useAuth((state) => state.user?.id);
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<UpdateForm>({
    id: "",
    name: "",
    email: "",
    username: "",
    isAuthor: false,
    role: "user",
    authorProfile: {
      bio: "",
      expertise: [],
      socialMedia: {
        website: "",
        twitter: "",
        linkedin: "",
        github: "",
      },
    },
  });
  const [avatar, setAvatar] = useState<{ data: File | null; preview: string }>({
    data: null,
    preview: "",
  });

  // Fetch user profile
  useEffect(() => {
    if (!id) return;

    const getUserData = async () => {
      const res = await fetchCompleteUserData(id);
      if (res?.success && res.user) {
        setFormData(res.user);
        setAvatar({ ...avatar, preview: res.user.avatar || "" });
      } else {
        showToast("Failed to load profile.", "error");
      }
    };

    getUserData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (["name", "email", "username"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "bio") {
      setFormData((prev) => ({
        ...prev,
        authorProfile: { ...prev.authorProfile, bio: value },
      }));
    }
  };

  const handleSocialChange =
    (key: keyof typeof formData.authorProfile.socialMedia) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        authorProfile: {
          ...prev.authorProfile,
          socialMedia: {
            ...prev.authorProfile.socialMedia,
            [key]: e.target.value,
          },
        },
      }));
    };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      const isActive = prev.authorProfile.expertise.includes(tag);
      const updatedTags = isActive
        ? prev.authorProfile.expertise.filter((t) => t !== tag)
        : prev.authorProfile.expertise.length < 3
        ? [...prev.authorProfile.expertise, tag]
        : prev.authorProfile.expertise;

      return {
        ...prev,
        authorProfile: { ...prev.authorProfile, expertise: updatedTags },
      };
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar({ data: file, preview: URL.createObjectURL(file) });
    setFormData((prev) => ({ ...prev, newImage: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("BEFORE SUBMIT", formData);

      const res = await updateUserProfile(formData);
      if (res?.success) {
        showToast("Profile updated successfully!", "success");
        router.push("/profile");
      } else {
        showToast("Failed to update profile.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("An error occurred.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Edit Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Avatar */}
        <div className="flex items-center space-x-4">
          {formData.avatar && (
            <Image
              src={avatar.preview}
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            rows={3}
            value={formData.authorProfile.bio}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Social Links */}
        <div>
          <p className="text-sm font-medium">Social Links (Optional)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {["website", "github", "linkedin", "twitter"].map((key) => (
              <input
                key={key}
                type="url"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={
                  formData.authorProfile.socialMedia[
                    key as keyof typeof formData.authorProfile.socialMedia
                  ] || ""
                }
                onChange={handleSocialChange(
                  key as keyof typeof formData.authorProfile.socialMedia
                )}
                className="border p-2 rounded"
              />
            ))}
          </div>
        </div>

        {/* Expertise Tags */}
        {formData.isAuthor && (
          <div>
            <p className="text-sm font-medium">Expertise (max 3)</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {presetExpertise.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    formData.authorProfile.expertise.includes(tag)
                      ? "bg-black text-white"
                      : "text-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="w-full bg-primary text-white py-2 rounded"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
