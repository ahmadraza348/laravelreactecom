import React from "react";
import AdminLayout from "../../common/adminLayout/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axios } from "axios";
import { apiUrl } from "../../common/http";

const show = () => {
  const [category, setCategory] = useState([]);

  const fetchCategories =async () => {
   try {
    const res = await axios.get(`${apiUrl}+categories`, {
        headers:{
            'content-type': "application/json",
        }
    })
    
    
   } catch (error) {
    
   }
  };

  return (
    <>
      <AdminLayout>
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between">
              <h4 className="h5">Categories</h4>
              <Link
                className="btn btn-primary btn-sm"
                as={Link}
                to="/admin/category/create"
              >
                Create
              </Link>
            </div>
            <hr />

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>id</td>
                  <td>title</td>
                  <td>slug</td>
                  <td>
                    {category.status == 1 ? "Active" : "Block"}
                    status
                  </td>
                  <td>
                    <Link
                      className="btn btn-primary btn-sm "
                      to={`/admin/category/edit/`}
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => deleteProject(category.id)}
                      href="#"
                      className="btn btn-secondary btn-sm  ms-2"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default show;
