import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div>
 <div className="mt-5 card shadow border-0 ">
        <div className="card-body p-4 sidebar">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/categories">Categories</Link></li>
            <li><Link to="/admin/brands">Brands</Link></li>
            <li><Link to="/admin/products">Products</Link></li>
         
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Sidebar