import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const storedAdmin = localStorage.getItem("adminInfo");
  const [user, setUser] = useState(
    storedAdmin ? JSON.parse(storedAdmin) : null
  ); //storing in staate bcz we dont want to remove admin info even page refresh

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
