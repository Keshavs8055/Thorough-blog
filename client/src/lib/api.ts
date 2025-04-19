import axios, { AxiosResponse } from "axios";
import { AuthUser, LoginFormState, SignupFormState, Post } from "@/utils/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enable sending cookies
});

// Generic interface for API responses that matches backend format
interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  user?: AuthUser;
  token?: string;
  currentPage?: number;
  totalPages?: number;
  totalPosts?: number;
  posts?: Post[];
}

// Function to handle Axios responses and errors consistently
const handleRequest = async <T = unknown>(
  request: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await request;
    console.log("RESPONSE", response);

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
    // Return a consistent error response
    return { success: false, message: errorMessage };
  }
};

// API calls using the handler
export const fetchHello = async (): Promise<ApiResponse<string>> => {
  return handleRequest(api.get("/test"));
};

export const fetchPosts = async (page = 1, limit = 6): Promise<ApiResponse> => {
  return handleRequest(api.get(`/api/posts?page=${page}&limit=${limit}`));
};

export const fetchPostById = async (id: string): Promise<ApiResponse<Post>> => {
  return handleRequest(
    api.get(`/api/posts/${id}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    })
  );
};

export const userSignUp = async (
  form: SignupFormState
): Promise<ApiResponse> => {
  return handleRequest(api.post("/api/auth/signup", form));
};

export const userLogin = async (form: LoginFormState): Promise<ApiResponse> => {
  return handleRequest(api.post("/api/auth/login", form));
};

export const fetchUser = async (): Promise<ApiResponse> => {
  return handleRequest(api.get("/api/user/me"));
};

export const verifyEmail = async (
  token: string,
  email: string
): Promise<ApiResponse> => {
  return handleRequest(
    api.get(`/api/auth/verify?token=${token}&email=${email}`)
  );
};

// Add a function for creating posts
export const createPost = async (
  postData: Omit<Post, "id" | "createdAt" | "author">
): Promise<ApiResponse<Post>> => {
  return handleRequest(api.post("/api/posts", postData));
};

// Add a function for updating posts
export const updatePost = async (
  id: string,
  postData: Partial<Post>
): Promise<ApiResponse<Post>> => {
  return handleRequest(api.put(`/api/posts/${id}`, postData));
};

// Add a function for deleting posts
export const deletePost = async (id: string): Promise<ApiResponse> => {
  return handleRequest(api.delete(`/api/posts/${id}`));
};

// Add a function for requesting author status
export const requestAuthorStatus = async (): Promise<ApiResponse> => {
  return handleRequest(api.post("/api/user/request-author"));
};

// Add a function for logging out
export const userLogout = async (): Promise<ApiResponse> => {
  return handleRequest(api.post("/api/auth/logout"));
};
