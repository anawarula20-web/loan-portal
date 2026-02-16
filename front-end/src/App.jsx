import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CustomerDashboard from "./pages/customer/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import ApplyLoan from "./pages/customer/ApplyLoan";
import Profile from "./pages/customer/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apply" element={<ApplyLoan />} />
        <Route path="/profile" element={<Profile />} />

        {/* Customer Dashboard */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}