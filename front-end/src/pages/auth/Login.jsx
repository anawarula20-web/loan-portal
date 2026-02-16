import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
    role: "customer"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );

      login(res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <input
          name="mobile"
          placeholder="Mobile"
          required
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <button className="bg-indigo-600 text-white w-full p-2 rounded mb-4">
          Login
        </button>

        <p className="text-center text-sm">
          First time user?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}