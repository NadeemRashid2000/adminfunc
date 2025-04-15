export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,mdx}", // ✅ Ensures Tailwind scans MDX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
