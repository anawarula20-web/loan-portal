import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    pan: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        form
      );

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input name="name" placeholder="Name" required
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input name="mobile" placeholder="Mobile No" required
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input name="email" placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input name="pan" placeholder="PAN No"
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input type="password" name="password"
          placeholder="Password" required
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded" />

        <button className="bg-indigo-600 text-white w-full p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}