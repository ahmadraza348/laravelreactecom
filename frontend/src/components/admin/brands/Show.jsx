import React, { useEffect } from "react";
import AdminLayout from "../../common/adminLayout/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";
import loadingGif from "../../../assets/loading.gif";

const Show = () => {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${apiUrl}brands`, {
        headers: {
          "content-type": "application/json",
          Accept: "Application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      if (res.data.status == 200) {
        setBrand(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);

  const deleteBrand = async (id) => {
    if (confirm("Are you sure to delete brand")) {
      try {
        const res = await axios.delete(`${apiUrl}brands/` + id, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
        });

        if (res.data.status === 200) {
          const newBrands = brand.filter((bran) => bran.id != id);
          setBrand(newBrands);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between">
              <h4 className="h5">Brands</h4>
              <Link
                className="btn btn-primary btn-sm"
                as={Link}
                to="/admin/brand/create"
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
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brand &&
                    brand.map((bran) => {
                      return (
                        <tr key={bran.id}>
                          <td>{bran.id}</td>
                          <td>{bran.name}</td>
                          <td>{bran.slug}</td>
                          <td>{bran.status == 1 ? "Active" : "Block"}</td>
                          <td>
                            <Link
                              className="btn btn-primary btn-sm "
                              to={`/admin/brand/edit/${bran.id}`}
                            >
                              Edit
                            </Link>
                            <Link
                              onClick={() => deleteBrand(bran.id)}
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
  );
};

export default Show;
