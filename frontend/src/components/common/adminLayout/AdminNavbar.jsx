import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AdminAuthContext } from "../context/AdminAuth";
import { toast } from "react-toastify"; // ✅ import toast

const AdminNavbar = () => {
  const { logout } = useContext(AdminAuthContext);
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!"); // ✅ show toast after logout
  };
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <div className="btn btn-danger" onClick={handleLogout}>
                Logout
              </div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
