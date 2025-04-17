import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import Footer
import About from "./pages/About"; // Import About
import { UserProvider } from "./UserContext";
import CategoryBlogs from "./pages/CategoryBlogs";

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
              />
              <Route path="/about" element={<About />} />{" "}
              {/* Add About Route */}
            </Routes>
          </main>
          <Footer /> {/* Include Footer */}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
