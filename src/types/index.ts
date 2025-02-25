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
