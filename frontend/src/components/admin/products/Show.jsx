import React, { useState,useEffect } from "react";
import AdminLayout from "../../common/adminLayout/Layout";
import loadingGif from "../../../assets/loading.gif";
import { Link } from "react-router-dom";

import axios from "axios";
import { apiUrl, token } from "../../common/http";

const show = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}products`, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      if (res.data.status == 200) {
        setProduct((await res).data.data)
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      fetchProducts();
    }, []);

return (
  <>
    <AdminLayout>
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between">
            <h4 className="h5">Products</h4>
            <Link
              className="btn btn-primary btn-sm"
              as={Link}
              to="/admin/product/create"
            >
              Create
            </Link>
          </div>
          <hr />

          {loading ? (
            <div className="text-center py-5">
              <img src={loadingGif} alt="" />
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((pro) => {
                    return (
                      <tr key={pro.id}>
                        <td>{pro.id}</td>
                        <td>{pro.title}</td>
                        <td>{pro.status == 1 ? "Active" : "Block"}</td>
                        <td>
                          <Link
                            className="btn btn-primary btn-sm "
                            to={`/admin/product/edit/${pro.id}`}
                          >
                            Edit
                          </Link>
                          <Link
                            // onClick={() => deleteprod(pro.id)}
                            href="#"
                            className="btn btn-secondary btn-sm  ms-2"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  </>
)
};
export default show;
