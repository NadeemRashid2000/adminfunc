// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.token);
      navigate("/"); // ✅ Redirect to home after login
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="border w-full p-2 mb-2"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border w-full p-2 mb-2"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white w-full p-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
