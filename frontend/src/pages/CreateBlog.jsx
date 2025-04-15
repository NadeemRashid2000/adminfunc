import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/blogs",
        { title, content, image },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      console.error("Failed to create blog", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-violet-700">
        Create a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          className="w-full p-3 h-40 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 w-full"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;




// import React, { useState } from "react";
// import { createBlog } from "../api.js";

// const CreateBlog = () => {
//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     category: "",
//     content: "",
//   });

//   const categories = ["Operating System", "DSA", "Web Development", "Tech"];

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Format slug safely
//     const formattedSlug = form.slug
//       .trim()
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");

//     // Build frontmatter
//     const frontmatter =
//       `---\n` +
//       `title: ${form.title}\n` +
//       `slug: ${formattedSlug}\n` +
//       `description: ${form.description}\n` +
//       `category: ${form.category || "Others"}\n` +
//       `---\n\n`;

//     // Final markdown content to send
//     const markdownContent = frontmatter + form.content;
//     console.log("📝 Form data before submit:", form);
//     console.log("🔗 Formatted slug:", formattedSlug);
//     console.log("📄 Final MDX content to send:\n", markdownContent);

//     try {
//       await createBlog({ content: markdownContent });
//       alert(" Blog created successfully!");
//       setForm({
//         title: "",
//         slug: "",
//         description: "",
//         category: "",
//         content: "",
//       });
//     } catch (error) {
//       console.error(" Error creating blog:", error);
//       alert("Failed to create blog. Check the console for details.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           className="w-full p-2 border"
//           onChange={handleChange}
//           value={form.title}
//           required
//         />
//         <input
//           type="text"
//           name="slug"
//           placeholder="Slug (URL-friendly name)"
//           className="w-full p-2 border"
//           onChange={handleChange}
//           value={form.slug}
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Short description"
//           className="w-full p-2 border"
//           onChange={handleChange}
//           value={form.description}
//           required
//         />
//         <select
//           name="category"
//           className="w-full p-2 border"
//           onChange={handleChange}
//           value={form.category}
//           required
//         >
//           <option value="" disabled>
//             Select a category
//           </option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//         <textarea
//           name="content"
//           placeholder="Write your blog content here (in Markdown/MDX)"
//           className="w-full p-2 border"
//           rows="8"
//           onChange={handleChange}
//           value={form.content}
//           required
//         ></textarea>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Create Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBlog;
