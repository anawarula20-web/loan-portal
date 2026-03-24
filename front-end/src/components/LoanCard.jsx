import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoanCard({ title, company, amount, image }) {
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
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      
      {/* Image */}
      <img
        className="w-full h-48 object-cover rounded-t-2xl"
        src={image}
        alt={title}
      />

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-1">
          Company: <span className="font-semibold">{company}</span>
        </p>

        <p className="text-green-600 text-lg font-bold mb-4">
          ₹ {amount}
        </p>

        <button onClick={handleApply} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
}