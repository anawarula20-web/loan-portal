import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (user.role === "admin") navigate("/admin-dashboard");
    else navigate("/customer-dashboard");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-8 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-600">
        LOAN<span className="text-gray-900">PRO</span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition">Home</Link>
            <Link to="/profile" className="text-gray-600 hover:text-indigo-600 font-medium transition">Profile</Link>
            <button 
              onClick={handleDashboard}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
            >
              Dashboard
            </button>
            <button 
              onClick={logout}
              className="text-red-500 hover:text-red-700 font-bold text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}