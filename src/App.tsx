import { BrowserRouter, Routes, Route } from "react-router";
import { RootLayout, Homepage } from "@/pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<h1>About</h1>} />
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
