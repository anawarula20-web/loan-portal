import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ApplyLoan() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    amount: "",
    tenure: "",
    purpose: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${import.meta.env.VITE_API_URL}/api/loans/apply`, {
      ...form,
      userId: user._id
    });

    alert("Loan Applied Successfully");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Apply Loan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="amount" placeholder="Amount" onChange={handleChange} className="border p-2 w-full" />
        <input name="tenure" placeholder="Tenure (Months)" onChange={handleChange} className="border p-2 w-full" />
        <input name="purpose" placeholder="Purpose" onChange={handleChange} className="border p-2 w-full" />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}