export interface Instructors {
  id: string;
  full_name: string;
  email: string;
  avatar: string | null;
  total_enrollments: number;
  total_courses: number;
}

export interface FetchTopInstructors {
  data: Instructors;
}

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
  status: number;
  data: {
    data: {
      id: string;
      full_name: string;
      EnrolledCourses?: Course[];
      courses?: Course[];
    };
  };
}

export interface InstructorResponse extends Omit<User, "role"> {
  total_enrollments: string;
  total_courses: string;
}

export interface FetchInstructorResponse {
  status: number;
  data: {
    data: InstructorResponse[];
  };
}

export interface FetchCourseDetailsResponse {
  course: CourseDetails;
  totalStudents?: string;
  averageRating?: string;
  userRating?: number;
  userProgress?: number;
}

export interface CreateCourseResponse {
  status: number;
  data: {
    message: string;
    data: Omit<
      Course,
      "avg_rating" | "total_students" | "Category" | "Enrollment"
    >;
  };
}

export interface CreateLectureResponse {
  status: number;
  data: {
    message: string;
    data: Omit<Lecture, "pdf_path"> & { pdf_path: string | null };
  };
}

export interface UpdateCourseResponse {
  status: number;
  data: {
    message: string;
    data: Omit<
      Course,
      "avg_rating" | "total_students" | "Category" | "Enrollment"
    >;
  };
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
  Instructor: {
    id: string;
    full_name: string;
    avatar: string;
  };
}

export interface Lecture {
  course_id: string;
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

export interface FetchQuizResponse {
  status: number;
  data: {
    data: {
      question: string;
      options: string[];
      answer: string;
    }[];
  };
}

export interface FetchCourseContentResponse {
  status: number;
  data: {
    data: CourseContent;
  };
}

export interface UpdateLectureStatusResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
    progress: number;
  };
}

export interface GiveReviewResponse {
  status: number;
  data: {
    message: string;
    courseAvgrating: number;
  };
}

import { api, handleApiError } from "@/lib/axios";
import { Course, CourseContent, User } from "@/types";

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

export const fetchUserCourses = async (): Promise<FetchUserCoursesResponse> => {
  try {
    const response = await api.post("/api/courses/getcourses");
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

export const fetchCourseContent = async (
  courseId: string
): Promise<FetchCourseContentResponse> => {
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

export const createCourse = async (
  course: Partial<Course>
): Promise<CreateCourseResponse> => {
  try {
    const response = api.post("/api/courses/createcourse", course);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createLecture = async (
  lecture: Partial<Lecture>
): Promise<CreateLectureResponse> => {
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
): Promise<UpdateCourseResponse> => {
  try {
    const response = api.put(`/api/courses/update/${courseId}`, course);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchTopInstructors =
  async (): Promise<FetchInstructorResponse> => {
    try {
      const response = api.get(`/api/courses/topinstructors`);
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  };

export const updateLectureStatus = async (
  lectureId: string
): Promise<UpdateLectureStatusResponse> => {
  try {
    const response = api.post(
      `/api/courses/lectures/updatestatus/${lectureId}`
    );
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchRecommendedCourses =
  async (): Promise<FetchCoursesResponse> => {
    try {
      const response = api.get("/api/courses/ai/getrecommendations");
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  };

export const fetchAIQuiz = async (): Promise<FetchQuizResponse> => {
  try {
    const response = api.get("/api/courses/ai/getquiz");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const giveReviewApi = async (
  course_id: string,
  rating: number
): Promise<GiveReviewResponse> => {
  try {
    const response = api.put("/api/courses/updatecourserating", {
      course_id,
      rating,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
