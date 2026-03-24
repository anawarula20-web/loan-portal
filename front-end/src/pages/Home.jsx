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
        <LoanCard title="Personal Loan" company="CHOLA FINANCE" amount="10,00,000" image="https://loanjagat-appven.s3.ap-south-1.amazonaws.com/1756895977500_blob" />
        <LoanCard title="Business Loan" company="BAJAJ FINANCE" amount="30,00,000" image="https://res.cloudinary.com/jerrick/image/upload/v1661918605/630edd8cd55438001e52ab32.jpg" />
        <LoanCard title="Home Loan" company="RBL FINANCE" amount="50,00,000" image="https://img.etimg.com/thumb/width-1600,height-900,imgsize-1498184,resizemode-75,msid-129646744/wealth/borrow/lowest-home-loan-interest-rates-sbi-vs-hdfc-bank-vs-icici-bank-vs-canara-bank-which-bank-offers-lowest-emi-top-bank-rates-compared.jpg" />
      </div>
    </div>
  );
}