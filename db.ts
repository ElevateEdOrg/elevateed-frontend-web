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
    title: "Introduction to Data Science",
    Instructor: {
      id: "1a2b3c4d-5678-9101-1121-314151617181",
      email: "datascience@learnhub.com",
      full_name: "John Doe",
    },
    description:
      "Get started with data science, covering basics of statistics and Python.",
    price: "49.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2023-06-15",
    id: "course-intro-ds",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Python for Data Science",
    Instructor: {
      id: "2a3b4c5d-6789-1011-1213-415161718192",
      email: "pydata@learnhub.com",
      full_name: "Alice Smith",
    },
    description:
      "Learn how to use Python libraries like NumPy, Pandas, and Matplotlib for data analysis.",
    price: "59.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2022-11-22",
    id: "course-python-ds",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "Machine Learning A-Z",
    Instructor: {
      id: "3a4b5c6d-7891-0111-2131-516171819202",
      email: "mlbasics@learnhub.com",
      full_name: "Michael Johnson",
    },
    description:
      "A complete guide to supervised and unsupervised learning models.",
    price: "79.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2021-05-10",
    id: "course-ml-az",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "Deep Learning with TensorFlow",
    Instructor: {
      id: "4a5b6c7d-8910-1112-3141-617181920213",
      email: "deeplearn@learnhub.com",
      full_name: "Sarah Lee",
    },
    description:
      "Build and train deep learning models using TensorFlow and Keras.",
    price: "99.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2023-01-30",
    id: "course-deep-learning",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "Data Visualization with Python",
    Instructor: {
      id: "5a6b7c8d-9101-1121-3141-819202122232",
      email: "dataviz@learnhub.com",
      full_name: "David Brown",
    },
    description:
      "Master data visualization techniques using Seaborn and Matplotlib.",
    price: "69.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2024-02-12",
    id: "course-data-viz",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Big Data and Spark",
    Instructor: {
      id: "6a7b8c9d-1011-1213-4151-920212223242",
      email: "bigdata@learnhub.com",
      full_name: "Emma Wilson",
    },
    description:
      "Learn to process large datasets using Apache Spark and Hadoop.",
    price: "89.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2023-09-05",
    id: "course-big-data",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "Time Series Analysis",
    Instructor: {
      id: "7a8b9c0d-1112-1314-5151-223242526272",
      email: "timeseries@learnhub.com",
      full_name: "Robert Martin",
    },
    description: "Analyze time-dependent data using ARIMA and LSTM models.",
    price: "74.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2022-07-18",
    id: "course-time-series",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "NLP with Python",
    Instructor: {
      id: "8a9b0c1d-1213-1415-1617-242526272829",
      email: "nlp@learnhub.com",
      full_name: "Lisa White",
    },
    description:
      "Process and analyze textual data with Natural Language Processing.",
    price: "94.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2021-08-21",
    id: "course-nlp-python",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "Statistics for Data Science",
    Instructor: {
      id: "9a0b1c2d-1314-1516-1718-262728293031",
      email: "stats@learnhub.com",
      full_name: "James Carter",
    },
    description: "Understand statistical concepts essential for data science.",
    price: "54.99",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2022-10-10",
    id: "course-stats-ds",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Reinforcement Learning Basics",
    Instructor: {
      id: "0a1b2c3d-1415-1617-1819-282930313233",
      email: "rl@learnhub.com",
      full_name: "Sophia Moore",
    },
    description:
      "Explore how reinforcement learning powers AI models like AlphaGo.",
    price: "119.9",
    Category: {
      id: "cat-789",
      name: "Data Science",
    },
    created_at: "2024-01-05",
    id: "course-rl-basics",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "JavaScript Basics",
    Instructor: {
      id: "1a2b3c4d-5678-9101-1121-314151617181",
      email: "jsmaster@codehub.dev",
      full_name: "John Doe",
    },
    description:
      "Learn JavaScript from scratch, covering variables, loops, and functions.",
    price: "49.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2023-06-15",
    id: "course-js-basics",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Advanced TypeScript",
    Instructor: {
      id: "2a3b4c5d-6789-1011-1213-415161718192",
      email: "tsguru@codehub.dev",
      full_name: "Alice Smith",
    },
    description:
      "Master TypeScript with deep dives into generics, decorators, and interfaces.",
    price: "89.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2022-11-22",
    id: "course-adv-ts",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "Python for Beginners",
    Instructor: {
      id: "3a4b5c6d-7891-0111-2131-516171819202",
      email: "pythondev@codehub.dev",
      full_name: "Michael Johnson",
    },
    description:
      "Start coding in Python, covering syntax, OOP, and data handling.",
    price: "59.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2021-05-10",
    id: "course-python-beginner",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "Full-Stack Web Development",
    Instructor: {
      id: "4a5b6c7d-8910-1112-3141-617181920213",
      email: "fullstack@codehub.dev",
      full_name: "Sarah Lee",
    },
    description:
      "Learn front-end and back-end development with JavaScript, Node.js, and databases.",
    price: "119.9",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2023-01-30",
    id: "course-fullstack",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "C++ Data Structures & Algorithms",
    Instructor: {
      id: "5a6b7c8d-9101-1121-3141-819202122232",
      email: "cppmaster@codehub.dev",
      full_name: "David Brown",
    },
    description: "Master C++ and data structures to crack coding interviews.",
    price: "99.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2024-02-12",
    id: "course-cpp-dsa",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "React and Redux Mastery",
    Instructor: {
      id: "6a7b8c9d-1011-1213-4151-920212223242",
      email: "reactexpert@codehub.dev",
      full_name: "Emma Wilson",
    },
    description:
      "Master React.js, Redux, and state management for modern web applications.",
    price: "79.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2023-09-05",
    id: "course-react-redux",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "Node.js and Express",
    Instructor: {
      id: "7a8b9c0d-1112-1314-5151-223242526272",
      email: "nodeguru@codehub.dev",
      full_name: "Robert Martin",
    },
    description:
      "Learn to build scalable backend APIs with Node.js and Express.",
    price: "69.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2022-07-18",
    id: "course-node-express",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "Go Programming Language",
    Instructor: {
      id: "8a9b0c1d-1213-1415-1617-242526272829",
      email: "golangdev@codehub.dev",
      full_name: "Lisa White",
    },
    description:
      "Learn the basics of Go, including concurrency and performance optimizations.",
    price: "74.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2021-08-21",
    id: "course-go-lang",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "Rust Programming Fundamentals",
    Instructor: {
      id: "9a0b1c2d-1314-1516-1718-262728293031",
      email: "rustacean@codehub.dev",
      full_name: "James Carter",
    },
    description:
      "Learn Rust, memory safety, and systems programming techniques.",
    price: "84.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2022-10-10",
    id: "course-rust-basics",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Kotlin for Android Development",
    Instructor: {
      id: "0a1b2c3d-1415-1617-1819-282930313233",
      email: "androiddev@codehub.dev",
      full_name: "Sophia Moore",
    },
    description: "Master Kotlin to build Android apps using Jetpack Compose.",
    price: "89.99",
    Category: {
      id: "cat-123",
      name: "Programming",
    },
    created_at: "2024-01-05",
    id: "course-kotlin-android",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "HTML & CSS Fundamentals",
    Instructor: {
      id: "1a2b3c4d-5678-9101-1121-314151617181",
      email: "htmlcss@webdevhub.com",
      full_name: "John Doe",
    },
    description: "Learn the basics of web development with HTML and CSS.",
    price: "39.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2023-06-15",
    id: "course-html-css",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Responsive Web Design",
    Instructor: {
      id: "2a3b4c5d-6789-1011-1213-415161718192",
      email: "designmaster@webdevhub.com",
      full_name: "Alice Smith",
    },
    description:
      "Master responsive design techniques using CSS Grid and Flexbox.",
    price: "49.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2022-11-22",
    id: "course-responsive-design",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "JavaScript for Web Developers",
    Instructor: {
      id: "3a4b5c6d-7891-0111-2131-516171819202",
      email: "jsweb@webdevhub.com",
      full_name: "Michael Johnson",
    },
    description: "Understand JavaScript's role in modern web development.",
    price: "59.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2021-05-10",
    id: "course-js-webdev",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "Frontend Development with React",
    Instructor: {
      id: "4a5b6c7d-8910-1112-3141-617181920213",
      email: "reactguru@webdevhub.com",
      full_name: "Sarah Lee",
    },
    description: "Build powerful front-end applications using React and hooks.",
    price: "99.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2023-01-30",
    id: "course-react-frontend",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "Full-Stack Web Development",
    Instructor: {
      id: "5a6b7c8d-9101-1121-3141-819202122232",
      email: "fullstackdev@webdevhub.com",
      full_name: "David Brown",
    },
    description:
      "Master both frontend and backend development with MERN stack.",
    price: "119.9",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2024-02-12",
    id: "course-fullstack-web",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "Backend Development with Node.js",
    Instructor: {
      id: "6a7b8c9d-1011-1213-4151-920212223242",
      email: "nodeexpert@webdevhub.com",
      full_name: "Emma Wilson",
    },
    description:
      "Learn backend development with Node.js, Express, and databases.",
    price: "79.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2023-09-05",
    id: "course-node-backend",
  },
  {
    banner_image: "./src/assets/courseBanners/banner3.png",
    title: "Mastering Next.js",
    Instructor: {
      id: "7a8b9c0d-1112-1314-5151-223242526272",
      email: "nextjspro@webdevhub.com",
      full_name: "Robert Martin",
    },
    description: "Build powerful SEO-friendly web apps using Next.js.",
    price: "89.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2022-07-18",
    id: "course-nextjs",
  },
  {
    banner_image: "./src/assets/courseBanners/banner4.png",
    title: "Web Performance Optimization",
    Instructor: {
      id: "8a9b0c1d-1213-1415-1617-242526272829",
      email: "perfexpert@webdevhub.com",
      full_name: "Lisa White",
    },
    description:
      "Learn how to optimize web apps for better performance and SEO.",
    price: "74.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2021-08-21",
    id: "course-web-performance",
  },
  {
    banner_image: "./src/assets/courseBanners/banner1.png",
    title: "WordPress for Beginners",
    Instructor: {
      id: "9a0b1c2d-1314-1516-1718-262728293031",
      email: "wpbeginner@webdevhub.com",
      full_name: "James Carter",
    },
    description: "Start building websites easily with WordPress and Elementor.",
    price: "64.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2022-10-10",
    id: "course-wordpress",
  },
  {
    banner_image: "./src/assets/courseBanners/banner2.png",
    title: "API Development with GraphQL",
    Instructor: {
      id: "0a1b2c3d-1415-1617-1819-282930313233",
      email: "graphqlguru@webdevhub.com",
      full_name: "Sophia Moore",
    },
    description: "Build and optimize APIs with GraphQL and Apollo Server.",
    price: "94.99",
    Category: {
      id: "cat-456",
      name: "Web Development",
    },
    created_at: "2024-01-05",
    id: "course-graphql-api",
  },
];
