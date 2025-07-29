import axios, { AxiosResponse } from "axios";
import {
  LoginFormState,
  Post,
  CompleteUser,
  AuthorRequestForm,
} from "@/utils/types";
import { UpdateForm } from "@/app/(user)/editProfile/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API response interface
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  user?: CompleteUser;
  token?: string;
  currentPage?: number;
  totalPages?: number;
  totalPosts?: number;
  posts?: Post[];
  likes?: number;
  author?: {
    username: string;
    name: string;
    avatar: string;
    authorProfile: {
      bio: string;
      socialMedia: {
        website?: string;
        twitter?: string;
        linkedin?: string;
      };
      expertise: string[];
    };
  };
}

// Handle API responses and errors
const handleRequest = async <T = unknown>(
  request: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await request;
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;

      if (error.response?.data && typeof error.response.data === "object") {
        return {
          success: false,
          message: errorMessage,
          ...error.response.data,
        };
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("API Error:", error);
    return { success: false, message: errorMessage };
  }
};

//
// ─── AUTH ──────────────────────────────────────────────────────────────────────
//

export const userSignUp = async (formData: FormData): Promise<ApiResponse> =>
  handleRequest(
    axios.post(`${API_URL}/api/auth/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

export const userLogin = async (form: LoginFormState): Promise<ApiResponse> =>
  handleRequest(api.post("/api/auth/login", form));

export const userLogout = async (): Promise<ApiResponse> =>
  handleRequest(api.post("/api/auth/logout"));

export const verifyEmail = async (
  token: string,
  email: string
): Promise<ApiResponse> =>
  handleRequest(api.get(`/api/auth/verify?token=${token}&email=${email}`));

//
// ─── POSTS ─────────────────────────────────────────────────────────────────────
//

export const fetchPosts = async (page = 1, limit = 6): Promise<ApiResponse> =>
  handleRequest(api.get(`/api/posts?page=${page}&limit=${limit}`));

export const fetchPostById = async (id: string): Promise<ApiResponse<Post>> =>
  handleRequest(
    api.get(`/api/posts/${id}`, {
      headers: { "Cache-Control": "no-store" },
    })
  );

export const createPost = async (
  formData: FormData
): Promise<ApiResponse<Post>> =>
  handleRequest(
    axios.post(`${API_URL}/api/posts`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
  );

export const updatePost = async (
  id: string,
  postData: Partial<Post>
): Promise<ApiResponse<Post>> =>
  handleRequest(api.put(`/api/posts/${id}`, postData));

export const deletePost = async (id: string): Promise<ApiResponse> =>
  handleRequest(api.delete(`/api/posts/${id}`));

export const likePost = async (
  postId: string
): Promise<ApiResponse<{ likes: number }>> =>
  handleRequest(api.post(`/api/posts/${postId}/like`));

//
// ─── USER ──────────────────────────────────────────────────────────────────────
//

export const fetchUser = async (): Promise<ApiResponse> =>
  handleRequest(api.get("/api/user/me"));

export const fetchCompleteUserData = async (id: string): Promise<ApiResponse> =>
  handleRequest(api.get(`/api/user/${id}`));

export const updateUserProfile = async (
  form: UpdateForm
): Promise<ApiResponse> => {
  const formData = new FormData();

  formData.append("authorProfile[bio]", form.authorProfile.bio);
  if (form.newImage) formData.append("image", form.newImage);
  if (form.name) formData.append("name", form.name);

  if (form.isAuthor) {
    const social = form.authorProfile.socialMedia;
    if (social.website)
      formData.append("authorProfile[socialMedia][website]", social.website);
    if (social.twitter)
      formData.append("authorProfile[socialMedia][twitter]", social.twitter);
    if (social.linkedin)
      formData.append("authorProfile[socialMedia][linkedin]", social.linkedin);
    form.authorProfile.expertise.forEach((tag, i) =>
      formData.append(`authorProfile[expertise][${i}]`, tag)
    );
  }

  return handleRequest(
    axios.put(`${API_URL}/api/user/edit-profile`, formData, {
      withCredentials: true,
    })
  );
};

//
// ─── AUTHOR ────────────────────────────────────────────────────────────────────
//

export const fetchAuthorPageData = async (
  username: string
): Promise<ApiResponse> =>
  handleRequest(api.get(`/api/user/author/${username}`));

export const requestAuthorStatus = async (): Promise<ApiResponse> =>
  handleRequest(api.post("/api/user/request-author"));

export const upgradeToAuthor = async (
  form: AuthorRequestForm
): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("authorProfile[bio]", form.bio);
  if (form.avatar) formData.append("image", form.avatar);
  if (form.website)
    formData.append("authorProfile[socialMedia][website]", form.website);
  if (form.twitter)
    formData.append("authorProfile[socialMedia][twitter]", form.twitter);
  if (form.linkedin)
    formData.append("authorProfile[socialMedia][linkedin]", form.linkedin);
  form.expertise.forEach((tag, i) =>
    formData.append(`authorProfile[expertise][${i}]`, tag)
  );

  return handleRequest(
    axios.post(`${API_URL}/api/user/upgrade`, formData, {
      withCredentials: true,
    })
  );
};

//
// ─── SEARCH ────────────────────────────────────────────────────────────────────
//

export const searchPosts = async (
  q: string,
  page = 1,
  limit = 10
): Promise<ApiResponse> =>
  handleRequest(
    api.get(
      `/api/search/searchPosts?q=${encodeURIComponent(
        q
      )}&page=${page}&limit=${limit}`
    )
  );
export const searchPostsByTag = async (
  tag: string,
  page = 1,
  limit = 10
): Promise<ApiResponse> =>
  handleRequest(
    api.get(
      "/api/search/tags?q=" +
        encodeURIComponent(tag) +
        `&page=${page}&limit=${limit}`
    )
  );
// Alias removed: `searchPostsByTag` was identical to `searchPosts`

//
// ─── TEST ──────────────────────────────────────────────────────────────────────
//

export const fetchHello = async (): Promise<ApiResponse<string>> =>
  handleRequest(api.get("/test"));
