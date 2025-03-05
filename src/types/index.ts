export type AuthStates = "login" | "register" | "forgot" | "reset" | "otp";
// export interface Course {
//   id?: string;
//   title: string;
//   description: string;
//   instructor_id: string;
//   price: number;
//   category_id: string;
//   banner_image: string;
//   welcome_msg: string;
//   intro_video: string;
//   created_at: string;
//   total_students: number;
//   avg_rating: number;
//   Instructor: {
//     id: string;
//     full_name: string;
//     email: string;
//   };
//   Category: {
//     id: string;
//     name: string;
//   };
// }

// Define the structure of the user object in the response

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  category_id: string;
  banner_image: string;
  welcome_msg: string;
  intro_video: string;
  created_at: string;
  updated_at: string;
  total_students?: number;
  avg_rating: number;
  Category: {
    id: string;
    name: string;
  };
  Instructor: {
    id: string;
    full_name: string;
    email: string;
  };
  Enrollment: {
    progress: string;
  };
}
export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface APIResponse {
  data: {
    status: "success" | "error";
  };
  status: number;
  statusText: string;
}
export interface Lecture {
  course_id: string;
  id: string;
  title: string;
  description: string;
  video_path: string | null;
  pdf_path: string | null;
}

export interface CourseContent {
  course: Omit<
    Course,
    | "category_id"
    | "created_at"
    | "updated_at"
    | "total_students"
    | "avg_rating"
    | "Category"
    | "Enrollment"
  > & {
    Lectures: Lecture[];
  };
  userProgress: string;
  userRating: string;
}
