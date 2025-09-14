import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const signin = () => navigate("/signin");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = {};
    if (!form.email.trim()) tempErrors.email = "Email is required";
    if (!form.password.trim()) tempErrors.password = "Password is required";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        // 🔹 1. Login -> get token
        const res = await axios.post("http://localhost:5000/login", form);
        const token = res.data.token;

        if (!token) {
          alert("No token received. Try again.");
          return;
        }

        // 🔹 2. Save token in localStorage
        localStorage.setItem("token", token);

        // 🔹 3. Check authentication with token
        const res2 = await axios.get("http://localhost:5000/check", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res2.status === 200) {
          // ✅ go to protected page after successful login
          navigate("/login"); 
        } else {
          alert("Login failed, please try again");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert(
          err.response?.data?.message || "Invalid credentials. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* Password */}
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-4 transition duration-200"
        >
          Login
        </button>

        {/* Link to Signup */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline font-semibold"
            onClick={signin}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
