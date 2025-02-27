// export const loginUser = async (
//   email: string,
//   password: string
// ): Promise<AuthUserResponse> => {
//   try {
//     const response = api.post("/api/auth/login", {
//       email,
//       password,
//     });
//     return response;
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

export interface FetchCoursesResponse {
  status: number;
  data: {
    data: Course[];
  };
}

export interface FetchCategoriesResponse {
  status: number;
  data: {
    data: {
      id: string;
      name: string;
    }[];
  };
}

import { api, handleApiError } from "@/lib/axios";
import { Course } from "@/types";

export const fetchAllCourses = async (): Promise<FetchCoursesResponse> => {
  try {
    const response = api.get("/api/courses/getcourses");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchAllCategories =
  async (): Promise<FetchCategoriesResponse> => {
    try {
      const response = api.get("/api/courses/categories");
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  };
