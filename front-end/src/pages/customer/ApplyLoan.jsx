import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Path check kar lena (../../ correct hai ya ../)
import { useNavigate } from "react-router-dom";

export default function ApplyLoan() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [panFile, setPanFile] = useState(null);

  const [form, setForm] = useState({
    loanType: "",
    requiredAmount: "",
    pan: "",
    purpose: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return alert("Please login first");

    setLoading(true);
    try {
      // FormData object banana padega kyunki file upload ho rahi hai
      const data = new FormData();
      data.append("loanType", form.loanType);
      data.append("requiredAmount", form.requiredAmount);
      data.append("pan", form.pan);
      data.append("purpose", form.purpose);
      data.append("userId", user._id);
      if (panFile) {
        data.append("uploadPan", panFile);
      }

      // NOTE: Axios mein direct 'data' pass karein, { data } nahi
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/loans/apply`, 
        data,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      if (res.data.success || res.status === 200) {
        alert("Loan Applied Successfully!");
        navigate("/customer-dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Submission failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Apply for Loan</h2>
        <p className="text-gray-500 mb-8">Upload your documents and details.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Loan Type</label>
            <select 
              name="loanType" 
              value={form.loanType} 
              onChange={handleChange} 
              className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            >
              <option value="">-- Select --</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Business Loan">Business Loan</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Amount (₹)</label>
            <input 
              name="requiredAmount" 
              type="number"
              placeholder="e.g. 100000" 
              onChange={handleChange} 
              className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">PAN Number</label>
            <input 
              name="pan" 
              placeholder="ABCDE1234F" 
              onChange={handleChange} 
              className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Upload PAN (Image/PDF)</label>
            <input 
              type="file" 
              onChange={(e) => setPanFile(e.target.files[0])} 
              className="w-full p-3 mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Purpose</label>
            <textarea 
              name="purpose" 
              rows="2"
              placeholder="Reason for loan" 
              onChange={handleChange} 
              className="w-full p-4 mt-1 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              required 
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition shadow-lg ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Uploading..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}