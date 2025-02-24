import { BrowserRouter, Routes, Route } from "react-router";
import { RootLayout, Homepage, Authenticate } from "@/pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="authenticate" element={<Authenticate />} />
          <Route path="about" element={<h1>About</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
