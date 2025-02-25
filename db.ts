import { Course } from "./src/types/index";
export const dummyCategories = [
  { id: "a11b0308-384e-4486-81d1-7545bb1e462d", name: "Programming" },
  { id: "b22c1419-495f-5597-92e2-8656cc2f573e", name: "Web Development" },
  { id: "c33d252a-5a60-66a8-a3f3-9767dd3f684f", name: "Data Science" },
  { id: "d44e363b-6b71-77b9-b4f4-a878ee4f795g", name: "Machine Learning" },
  {
    id: "e55f474c-7c82-88ca-c5g5-b989ff5g806h",
    name: "Artificial Intelligence",
  },
  { id: "f66g585d-8d93-99db-d6h6-caa0g06h917i", name: "Cloud Computing" },
  { id: "g77h696e-9ea4-00ec-e7i7-dbb1h17i028j", name: "Cybersecurity" },
  { id: "h88i707f-afb5-11fd-f8j8-ecc2i28j139k", name: "Networking" },
  { id: "i99j818g-b0c6-22ge-g9k9-fdd3j39k240l", name: "Blockchain" },
  { id: "j00k929h-c1d7-33hf-h0l0-gee4k40l351m", name: "Game Development" },
  {
    id: "k11l030i-d2e8-44ig-i1m1-hff5l51m462n",
    name: "Mobile App Development",
  },
  { id: "l22m141j-e3f9-55jh-j2n2-igg6m62n573o", name: "UI/UX Design" },
  { id: "m33n252k-f4g0-66ki-k3o3-jhh7n73o684p", name: "Software Testing" },
  { id: "n44o363l-g5h1-77lj-l4p4-kii8o84p795q", name: "Embedded Systems" },
];

export const dummyCourse: Partial<Course> = {
  banner_image: "./src/assets/courseBanners/banner3.png",
  title: "Vue JS crash course",
  Instructor: {
    id: "37a8f2de-3df3-4d13-a32c-0ea0c64de833",
    email: "akelnfladknf@klnaldkfn.ad",
    full_name: "Kitani Studio",
  },
  Category: {
    id: "37a8f2de-3df3-4d13-a32c-0ea0c64de833",
    name: "Frontend",
  },
  created_at: "2021-09-09",
  id: "oirjoieofn1o2nro2nfo23knro2fkn3ont",
};

export const dummyCourses: Partial<Course>[] = [
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "Python for Beginners",
    Instructor: {
      id: "1a2b3c4d-1111-2222-3333-444455556666",
      email: "pythonpro@learncode.com",
      full_name: "John Doe",
    },
    Category: {
      id: "a11b0308-384e-4486-81d1-7545bb1e462d",
      name: "Programming",
    },
    created_at: "2022-05-12",
    id: "python_course_001",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Java Programming Mastery",
    Instructor: {
      id: "2b3c4d5e-2222-3333-4444-555566667777",
      email: "javapro@learncode.com",
      full_name: "Jane Smith",
    },
    Category: {
      id: "a11b0308-384e-4486-81d1-7545bb1e462d",
      name: "Programming",
    },
    created_at: "2023-01-20",
    id: "java_course_002",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "C++ Fundamentals",
    Instructor: {
      id: "3c4d5e6f-3333-4444-5555-666677778888",
      email: "cppguru@learncode.com",
      full_name: "Alex Johnson",
    },
    Category: {
      id: "a11b0308-384e-4486-81d1-7545bb1e462d",
      name: "Programming",
    },
    created_at: "2021-11-15",
    id: "cpp_course_003",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "Advanced JavaScript",
    Instructor: {
      id: "4d5e6f7g-4444-5555-6666-777788889999",
      email: "jsmaster@webdevpro.com",
      full_name: "Sara Lee",
    },
    Category: {
      id: "b22c1419-495f-5597-92e2-8656cc2f573e",
      name: "Web Development",
    },
    created_at: "2022-08-18",
    id: "js_course_004",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "Full-Stack Web Development",
    Instructor: {
      id: "5e6f7g8h-5555-6666-7777-888899990000",
      email: "fullstack@webdevpro.com",
      full_name: "Michael Chen",
    },
    Category: {
      id: "b22c1419-495f-5597-92e2-8656cc2f573e",
      name: "Web Development",
    },
    created_at: "2023-02-10",
    id: "fullstack_course_005",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "React and Redux Crash Course",
    Instructor: {
      id: "6f7g8h9i-6666-7777-8888-999900001111",
      email: "reactmaster@webdevpro.com",
      full_name: "Emily Davis",
    },
    Category: {
      id: "b22c1419-495f-5597-92e2-8656cc2f573e",
      name: "Web Development",
    },
    created_at: "2022-06-30",
    id: "react_course_006",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "Data Science with Python",
    Instructor: {
      id: "7g8h9i0j-7777-8888-9999-000011112222",
      email: "datascientist@aiacademy.com",
      full_name: "Robert Wilson",
    },
    Category: {
      id: "c33d252a-5a60-66a8-a3f3-9767dd3f684f",
      name: "Data Science",
    },
    created_at: "2023-09-05",
    id: "datasci_course_007",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "Deep Learning with TensorFlow",
    Instructor: {
      id: "8h9i0j1k-8888-9999-0000-111122223333",
      email: "deeplearning@aiacademy.com",
      full_name: "Linda Green",
    },
    Category: {
      id: "e55f474c-7c82-88ca-c5g5-b989ff5g806h",
      name: "Artificial Intelligence",
    },
    created_at: "2021-12-22",
    id: "ai_course_008",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "Machine Learning with Scikit-Learn",
    Instructor: {
      id: "9i0j1k2l-9999-0000-1111-222233334444",
      email: "mlengineer@aiacademy.com",
      full_name: "Kevin Brown",
    },
    Category: {
      id: "d44e363b-6b71-77b9-b4f4-a878ee4f795g",
      name: "Machine Learning",
    },
    created_at: "2022-10-10",
    id: "ml_course_009",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Cybersecurity Fundamentals",
    Instructor: {
      id: "0j1k2l3m-0000-1111-2222-333344445555",
      email: "cyberexpert@cyberdefense.com",
      full_name: "Daniel White",
    },
    Category: {
      id: "g77h696e-9ea4-00ec-e7i7-dbb1h17i028j",
      name: "Cybersecurity",
    },
    created_at: "2023-07-08",
    id: "cyber_course_010",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "Cloud Computing with AWS",
    Instructor: {
      id: "1k2l3m4n-1111-2222-3333-444455556666",
      email: "cloudmaster@cloudacademy.com",
      full_name: "Jessica Adams",
    },
    Category: {
      id: "f66g585d-8d93-99db-d6h6-caa0g06h917i",
      name: "Cloud Computing",
    },
    created_at: "2023-04-14",
    id: "cloud_course_011",
  },
];
