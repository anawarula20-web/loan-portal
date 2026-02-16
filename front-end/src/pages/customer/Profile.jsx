import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <div className="p-10 text-center">Loading User Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cover/Header Color */}
          <div className="h-32 bg-indigo-600"></div>
          
          <div className="p-8 -mt-16">
            <div className="flex flex-col items-center">
              {/* Profile Initial Circle */}
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center text-3xl font-black text-indigo-600 border-4 border-white shadow-md">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              
              <h1 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-indigo-600 font-semibold uppercase text-xs tracking-widest">{user.role}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase">Email Address</p>
                <p className="text-gray-800 font-medium">{user.email || "N/A"}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase">Mobile Number</p>
                <p className="text-gray-800 font-medium">{user.mobile}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase">PAN Card</p>
                <p className="text-gray-800 font-medium uppercase">{user.pan || "Not Provided"}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase">Account Status</p>
                <p className="text-green-600 font-bold">Active</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                Edit Profile
              </button>
              <button className="flex-1 border border-red-200 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 transition">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}