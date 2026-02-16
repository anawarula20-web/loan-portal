import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ApplyLoan() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    tenure: "",
    purpose: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return alert("Please login first");

    setLoading(true);
    try {
      const loanData = {
        userId: user._id, // Context se user ID le rahe hain
        amount: formData.amount,
        tenure: formData.tenure,
        purpose: formData.purpose
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/loans/apply`, loanData);

      if (res.data.success) {
        alert("Loan Applied Successfully!");
        navigate("/customer-dashboard"); // Submit hote hi dashboard bhejo
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Apply for Loan</h2>
        <p className="text-gray-500 mb-8">Fill in the details to get started.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Loan Amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 50000"
              className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Tenure (Months)</label>
            <input
              type="number"
              placeholder="e.g. 12"
              className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Purpose</label>
            <textarea
              placeholder="Why do you need this loan?"
              className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              rows="3"
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition shadow-lg ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}