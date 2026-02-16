import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoanCard({ title, amount }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "customer") {
      navigate("/apply"); // Redirect to loan form
    } else {
      alert("Admin cannot apply for loan");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mt-2">Up to ₹{amount}</p>
      <button
        onClick={handleApply}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Apply Now
      </button>
    </div>
  );
}