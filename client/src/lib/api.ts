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
  }, // Enable sending cookies
});

// Generic interface for API responses that matches backend format
interface ApiResponse<T = unknown> {
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
}

// Function to handle Axios responses and errors consistently
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

// export const userSignUp = async (
//   formData: SignupFormState
// ): Promise<ApiResponse> => {
//   return handleRequest(
//     axios.post(`${API_URL}/api/auth/signup`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//   );
// };
// export const userLogin = async (form: LoginFormState): Promise<ApiResponse> => {
//   return handleRequest(api.post("/api/auth/login", form));
// };

export const userSignUp = async (formData: FormData): Promise<ApiResponse> => {
  return handleRequest(
    axios.post(`${API_URL}/api/auth/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
};

export const userLogin = async (form: LoginFormState): Promise<ApiResponse> => {
  return handleRequest(api.post("/api/auth/login", form));
};

export const fetchUser = async (): Promise<ApiResponse> => {
  return handleRequest(api.get("/api/user/me"));
};

export const fetchCompleteUserData = async (
  id: string
): Promise<ApiResponse> => {
  return handleRequest(api.get(`/api/user/${id}`));
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
  formData: FormData
): Promise<ApiResponse<Post>> => {
  return handleRequest(
    axios.post(`${API_URL}/api/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
  );
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
// Add a function for liking posts
export const likePost = async (
  postId: string
): Promise<ApiResponse<{ likes: number }>> => {
  return handleRequest(api.post(`/api/posts/${postId}/like`));
};

// Add a function for requesting author status
export const requestAuthorStatus = async (): Promise<ApiResponse> => {
  return handleRequest(api.post("/api/user/request-author"));
};

// Add a function for logging out
export const userLogout = async (): Promise<ApiResponse> => {
  return handleRequest(api.post("/api/auth/logout"));
};

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
  form.expertise.forEach((tag, index) => {
    formData.append(`authorProfile[expertise][${index}]`, tag);
  });

  return handleRequest(
    axios.post(`${API_URL}/api/user/upgrade`, formData, {
      withCredentials: true,
    })
  );
};

export const updateUserProfile = async (
  form: UpdateForm
): Promise<ApiResponse> => {
  const formData = new FormData();

  formData.append("authorProfile[bio]", form.authorProfile.bio);
  if (form.newImage) formData.append("image", form.newImage);
  if (form.name) formData.append("name", form.name);
  if (form.isAuthor && form.authorProfile.socialMedia.website)
    formData.append(
      "authorProfile[socialMedia][website]",
      form.authorProfile.socialMedia.website
    );
  if (form.isAuthor && form.authorProfile.socialMedia.twitter)
    formData.append(
      "authorProfile[socialMedia][twitter]",
      form.authorProfile.socialMedia.twitter
    );
  if (form.isAuthor && form.authorProfile.socialMedia.linkedin)
    formData.append(
      "authorProfile[socialMedia][linkedin]",
      form.authorProfile.socialMedia.linkedin
    );
  if (form.isAuthor) {
    form.authorProfile.expertise.forEach((tag, index) => {
      formData.append(`authorProfile[expertise][${index}]`, tag);
    });
  }

  return handleRequest(
    axios.put(`${API_URL}/api/user/edit-profile`, formData, {
      withCredentials: true,
    })
  );
};

export const searchPosts = async (
  q: string,
  page = 1,
  limit = 10
): Promise<ApiResponse> => {
  return handleRequest(
    api.get(
      `/api/search/searchPosts?q=${encodeURIComponent(
        q
      )}&page=${page}&limit=${limit}`
    )
  );
};

export const searchPostsByTag = async (
  q: string,
  page = 1,
  limit = 10
): Promise<ApiResponse> => {
  return handleRequest(
    api.get(
      `/api/search/searchPosts?q=${encodeURIComponent(
        q
      )}&page=${page}&limit=${limit}`
    )
  );
};
