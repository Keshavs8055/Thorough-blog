import axios, { AxiosResponse } from "axios";
import {
  UserLogoutResponse,
  UserAuthenticatedResponse,
  CompleteUserResponse,
  CompleteAuthorResponse,
  CreatePostResponse,
  GetPostsResponseAny,
  GetPostByIdResponse,
  LikePostResponse,
  GetTagsResponse,
  IPost,
  InferResponse,
} from "../utils/globalTypes";

import { LoginFormState } from "../components/auth/hooks/useAuth";
import { AuthorRequestForm } from "@/app/(user)/becomeAnAuthor/page";
import { UpdateForm } from "@/app/(user)/editProfile/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequest = async <T = unknown>(
  request: Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
      if (error.response?.data && typeof error.response.data === "object") {
        return {
          success: false,
          message: errorMessage,
          ...error.response.data,
        } as T;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage } as T;
  }
};

// ─── AUTH ────────────────────────────────────────
export const userSignUp = async (
  formData: FormData
): Promise<UserAuthenticatedResponse> => {
  return handleRequest(
    api.post(`/api/auth/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
};

export const userLogin = async (
  form: LoginFormState
): Promise<UserAuthenticatedResponse> =>
  handleRequest(api.post("/api/auth/login", form));

export const userLogout = async (): Promise<UserLogoutResponse> =>
  handleRequest(api.post("/api/auth/logout"));

export const verifyEmail = async (
  token: string,
  email: string
): Promise<UserAuthenticatedResponse> =>
  handleRequest(api.get(`/api/auth/verify?token=${token}&email=${email}`));

// ─── POSTS ────────────────────────────────────────

export const fetchPosts = async (
  page = 1,
  limit = 6
): Promise<GetPostsResponseAny> =>
  handleRequest(api.get(`/api/posts?page=${page}&limit=${limit}`));

export const fetchPostById = async (id: string): Promise<GetPostByIdResponse> =>
  handleRequest(
    api.get(`/api/posts/${id}`, {
      headers: { "Cache-Control": "no-store" },
    })
  );

export const createPost = async (
  formData: FormData
): Promise<CreatePostResponse> =>
  handleRequest(
    axios.post(`${API_URL}/api/posts`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
  );

export const updatePost = async (
  id: string,
  postData: Partial<IPost>
): Promise<GetPostByIdResponse> =>
  handleRequest(api.put(`/api/posts/${id}`, postData));

export const deletePost = async (id: string): Promise<InferResponse<null>> =>
  handleRequest(api.delete(`/api/posts/${id}`));

export const likePost = async (postId: string): Promise<LikePostResponse> =>
  handleRequest(api.post(`/api/posts/${postId}/like`));

// ─── USER ────────────────────────────────────────

export const fetchUser = async (): Promise<CompleteUserResponse> =>
  handleRequest(api.get("/api/user/me"));

export const fetchCompleteUserData = async (
  id: string
): Promise<CompleteUserResponse> => handleRequest(api.get(`/api/user/${id}`));

export const updateUserProfile = async (
  form: UpdateForm
): Promise<CompleteUserResponse> => {
  const formData = new FormData();

  formData.append("authorProfile[bio]", form.authorProfile.bio);
  if (form.newImage) formData.append("image", form.newImage);
  if (form.name) formData.append("name", form.name);
  if (form.username) formData.append("username", form.username);
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

// ─── AUTHOR ────────────────────────────────────────

export const fetchAuthorPageData = async (
  username: string
): Promise<CompleteAuthorResponse> =>
  handleRequest(api.get(`/api/user/author/${username}`));

export const requestAuthorStatus = async (): Promise<InferResponse<null>> =>
  handleRequest(api.post("/api/user/request-author"));

export const upgradeToAuthor = async (
  form: AuthorRequestForm
): Promise<CompleteUserResponse> => {
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

// ─── SEARCH ────────────────────────────────────────

export const searchPosts = async (
  q: string,
  page = 1,
  limit = 10
): Promise<GetPostsResponseAny> =>
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
): Promise<GetPostsResponseAny> =>
  handleRequest(
    api.get(
      `/api/search/tags?q=${encodeURIComponent(
        tag
      )}&page=${page}&limit=${limit}`
    )
  );

export const getAllTags = async (): Promise<GetTagsResponse> =>
  handleRequest(api.get("/api/search/all-tags"));

// ─── TEST ────────────────────────────────────────

export const fetchHello = async (): Promise<InferResponse<string>> =>
  handleRequest(api.get("/test"));
