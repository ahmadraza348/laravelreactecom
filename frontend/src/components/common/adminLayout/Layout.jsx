import React from 'react';
import AdminNavbar from "../adminLayout/AdminNavbar";
import Sidebar from '../adminLayout/Sidebar';
import Footer from '../adminLayout/Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />

      <div className="container flex-grow-1 my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </div>

      
      <Footer />
    </div>
  );
};

export default Layout;
