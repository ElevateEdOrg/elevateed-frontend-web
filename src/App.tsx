import { BrowserRouter, Routes, Route } from "react-router";
import { RootLayout, Homepage, Profile, SingleCourse } from "@/pages";
import SearchResults from "./pages/SearchResults";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<SearchResults />} />
          {/* Dynamic route for course */}
          <Route path="courses/:courseId" element={<SingleCourse />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// TODO :
// Add currency conversion
// Add backend side filtering of categories
// Add backend side filtering of courses based on search query
// Add progress bar under the last watched course
// Add learning path on homepage
// Pagination in course apis
