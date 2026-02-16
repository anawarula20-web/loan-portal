import LoanCard from "../components/LoanCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) return navigate("/login");
    navigate("/apply");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-800">Fast & Secure Loan Approval</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Apply online and get instant approval within minutes
        </p>
        <button
          onClick={handleApply}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
        >
          Apply Now
        </button>
      </div>

      {/* Loan Cards */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        <LoanCard title="Personal Loan" amount="5,00,000" />
        <LoanCard title="Business Loan" amount="10,00,000" />
        <LoanCard title="Home Loan" amount="50,00,000" />
      </div>
    </div>
  );
}