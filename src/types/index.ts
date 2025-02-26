export type AuthStates = "login" | "register" | "reset";
export interface Course {
  id?: string;
  title: string;
  description: string;
  instructor_id: string;
  price: number;
  category_id: string;
  banner_image: string;
  welcome_msg: string;
  intro_video: string;
  created_at: string;
  Instructor: {
    id: string;
    full_name: string;
    email: string;
  };
  Category: {
    id: string;
    name: string;
  };
}

// Define the structure of the user object in the response
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
