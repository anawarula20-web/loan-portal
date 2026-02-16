import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        // Yahan setUser pe red line nahi aayegi kyunki state upar defined hai
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
    setLoading(false); 
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export me red line nahi aayegi, check karo AuthContext sahi se define hai
export const useAuth = () => {
  return useContext(AuthContext);
};