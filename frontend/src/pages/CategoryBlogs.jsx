import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api.js"; // Adjust the path if needed.  You may not have this file.
import axios from "axios";
import BlogCard from "../components/BlogCard.jsx"; // Assuming you have this component

const CategoryBlogs = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Moved the fetchBlogsByCategory function *inside* the useEffect
    const fetchBlogsByCategory = async () => {
      if (!categoryName) {
        setLoading(false);
        setError("Category name is undefined."); // set the error.
        return;
      }
      try {
        console.log("Fetching blogs for category:", categoryName);
        const response = await axios.get(
          `${API_BASE_URL}/blogs/category/${categoryName}`
        );
        if (response.status >= 200 && response.status < 300) {
          setBlogs(response.data);
        } else {
          setError(
            `Failed to fetch blogs: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        setError(`Error fetching blogs: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (categoryName) {
      // added this check
      fetchBlogsByCategory();
    }
  }, [categoryName]); // Dependency array includes categoryName

  if (loading) {
    return <div>Loading blogs for {categoryName}...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found for the category: {categoryName}</div>;
  }

  return (
    <div>
      <h1>Blogs in {categoryName}</h1>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default CategoryBlogs;
