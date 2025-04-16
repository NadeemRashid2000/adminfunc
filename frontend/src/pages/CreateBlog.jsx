import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { API_BASE_URL } from "../api";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    content: "",
  });

  const categories = ["Operating System", "DSA", "Web Development", "Tech"];
  const navigate = useNavigate();
  const { user } = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format slug safely
    const formattedSlug = form.slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Build frontmatter
    const frontmatter =
      `---\n` +
      `title: ${form.title}\n` +
      `slug: ${formattedSlug}\n` +
      `description: ${form.description}\n` +
      `category: ${form.category || "Others"}\n` +
      `---\n\n`;

    // Final markdown content to send
    const markdownContent = frontmatter + form.content;
    console.log("📝 Form data before submit:", form);
    console.log("🔗 Formatted slug:", formattedSlug);
    console.log("📄 Final MDX content to send:\n", markdownContent);

    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          content: markdownContent,
          title: form.title,
          slug: formattedSlug,
          description: form.description,
          category: form.category || "Others",
        }),
      });

      if (response.ok) {
        alert("Blog created successfully!");
        navigate("/");
        setForm({
          title: "",
          slug: "",
          description: "",
          category: "",
          content: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to create blog: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error(" Error creating blog:", error);
      alert("Failed to connect to the server to create blog.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.title}
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug (URL-friendly name)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.slug}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Short description"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.description}
          required
        />
        <select
          name="category"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.category}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="content"
          placeholder="Write your blog content here (in Markdown/MDX)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="8"
          onChange={handleChange}
          value={form.content}
          required
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;



