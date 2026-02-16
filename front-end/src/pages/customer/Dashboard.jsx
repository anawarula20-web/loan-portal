import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // 1. Ye add kiya

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate(); // 2. Ye initialize kiya
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans/user/${user._id}`);
        setLoans(res.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    if (user?._id) fetchLoans();
  }, [user]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {user.name}!</h1>
          <p className="text-gray-500">Track your loan applications and status.</p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Applied</p>
            <p className="text-4xl font-bold text-indigo-600">{loans.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Approved Loans</p>
            <p className="text-4xl font-bold text-green-500">{loans.filter(l => l.status === 'Approved').length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center flex items-center justify-center">
            {/* 3. Button mein onClick route set kiya */}
             <button 
              onClick={() => navigate("/apply")} 
              className="bg-indigo-600 text-white w-full py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
             >
              + New Application
             </button>
          </div>
        </div>

        {/* Loan List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Amount</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Purpose</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-900">₹{loan.amount.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{loan.purpose}</td>
                  <td className="p-4">
                    <span className={`px-4 py-1 rounded-full text-xs font-black tracking-wide shadow-sm ${
                      loan.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      loan.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {loan.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loans.length === 0 && <p className="p-10 text-center text-gray-400">No applications found.</p>}
        </div>
      </div>
    </div>
  );
}