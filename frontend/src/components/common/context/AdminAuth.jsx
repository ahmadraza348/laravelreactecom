// components/common/context/adminAuth.jsx
import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const storedAdmin = localStorage.getItem("adminInfo");
  const [user, setUser] = useState(storedAdmin ? JSON.parse(storedAdmin) : null);

  const login = (adminData) => {
    localStorage.setItem("adminInfo", JSON.stringify(adminData));
    setUser(adminData);
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
