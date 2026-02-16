import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans/all`);
        setLoans(res.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const handleStatus = async (id, status) => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/loans/status/${id}`, { status });
    setLoans(loans.map(l => l._id === id ? { ...l, status } : l));
  } catch (error) {
    // Variable 'error' ko use kar liya, ab red line nahi aayegi
    console.error("Status update failed:", error); 
    alert("Update failed, please try again.");
  }
};

  if (loading) return <div className="p-10 text-center">Admin Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">Loan Management <span className="text-indigo-600">Admin</span></h2>
        
        <div className="grid grid-cols-1 gap-4">
          {loans.map((loan) => (
            <div key={loan._id} className="bg-white p-6 rounded-2xl shadow-sm flex flex-wrap justify-between items-center border border-slate-200">
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Customer</p>
                  <p className="font-bold text-slate-900">{loan.userId?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Amount</p>
                  <p className="font-bold text-indigo-600 text-lg">₹{loan.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Status</p>
                  <span className="text-sm font-semibold text-slate-600">{loan.status}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => handleStatus(loan._id, "Approved")}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-600 shadow-md shadow-emerald-100 transition"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleStatus(loan._id, "Rejected")}
                  className="bg-rose-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-rose-600 shadow-md shadow-rose-100 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}