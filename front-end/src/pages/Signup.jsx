import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 Password match validation
  if (form.password !== form.confirmPassword) {
    alert("Password do not match");
    return;
  }

  const { confirmPassword: _, ...userData } = form;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        userData
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

        <input type="text" name="name" placeholder="Full Name" pattern="[A-Za-z\s]+" required
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input type="text" name="mobile" placeholder="Mobile No" maxLength="10" pattern="[0-9]{10}" required
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input type="email" name="email" placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input type="date" name="dob" required
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded" />

        <input type="password" name="password"
          placeholder="Password" minLength="6" required
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded" />

        <input type="password" name="confirmPassword"
          placeholder="Confirm Password" required
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded" />

        <button className="bg-indigo-600 text-white w-full p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}