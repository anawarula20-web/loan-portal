import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // Jab tak refresh ke baad user load ho raha hai, tab tak blank ya loader dikhao
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Agar user login nahi hai, toh Home (/) par bhejo
  if (!user) {
    return <Navigate to="/" />;
  }

  // Agar user ka role match nahi karta
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}