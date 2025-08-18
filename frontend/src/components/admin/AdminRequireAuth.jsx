import { useContext } from "react";
import { AdminAuthContext } from "../common/context/adminAuth";
import { Navigate } from "react-router-dom";

export const AdminRequireAuth = ({ children }) => {
  const { user } = useContext(AdminAuthContext);

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return children
};
