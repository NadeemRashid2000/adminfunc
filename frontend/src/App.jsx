import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Header from "./components/Header";
import { UserProvider } from "./UserContext";
import CategoryBlogs from "./pages/CategoryBlogs"; // Import the new component

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blogs/slug/:slug" element={<BlogDetails />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryBlogs />}
              />{" "}
              {/* Use the new component here */}
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
