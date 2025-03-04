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
export interface FetchSingleCourseResponse {
  status: number;
  data: {
    data: Course;
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

export interface FetchUserCoursesResponse {
  data: {
    id: number;
    full_name: string;
    data: {
      EnrolledCourses: Course[];
    };
  };
}

export interface FetchCourseDetailsResponse {
  course: CourseDetails;
  totalStudents?: string;
  averageRating?: string;
  userRating?: number;
  userProgress?: number;
}

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  price: string;
  banner_image: string | null;
  welcome_msg: string;
  intro_video: string | null;
  Lectures: Lecture[];
}

export interface Lecture {
  id: string;
  title: string;
  description: string;
  video_path: string | null;
  pdf_path: string | null;
}

export interface PaymentResponse {
  status: number;
  data: {
    success: boolean;
    data: string;
  };
}

export interface UploadBannerAndIntroVideoResponse {
  status: number;
  data: {
    message: string;
    data: {
      banner_image: string;
      intro_video: string;
    };
  };
}

import { api, handleApiError } from "@/lib/axios";
import { Course } from "@/types";
import axios from "axios";

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

export const fetchUserCourses = async (): Promise<any> => {
  try {
    const response = await api.post<FetchUserCoursesResponse>(
      "/api/courses/getcourses"
    );
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchCourseByQuery = async (
  query: string
): Promise<FetchCoursesResponse> => {
  try {
    const response = api.get(`/api/courses/searchcourse?search=${query}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchUnpaidCourseFromId = async (
  courseId: string
): Promise<FetchSingleCourseResponse> => {
  try {
    const response = api.get(`/api/courses/getcourses/${courseId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchCourseContent = async (courseId: string): Promise<any> => {
  try {
    const response = api.get(`/api/courses/content/${courseId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const makePayment = async (
  courseIds: Course["id"][]
): Promise<PaymentResponse> => {
  try {
    const response = api.post("/api/courses/payment/makepayement", {
      courseIds,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const uploadBannerAndIntroVideo = async (
  formdata: FormData
): Promise<UploadBannerAndIntroVideoResponse> => {
  try {
    console.log(
      "formdata",
      formdata.get("banner_img"),
      formdata.get("intro_video")
    );
    const response = api.post("/api/courses/upload", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
};

export const createCourse = async (course: Partial<Course>): Promise<any> => {
  try {
    const response = api.post("/api/courses/createcourse", course);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createLecture = async (
  lecture: Partial<Lecture>
): Promise<any> => {
  try {
    const response = api.post("/api/courses/lectures/createlecture", lecture);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateCourse = async (
  courseId: string,
  course: Partial<Course>
): Promise<any> => {
  try {
    const response = api.put(`/api/courses/update/${courseId}`, course);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
