import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../common/adminLayout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch category data by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${apiUrl}categories/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
        });

        if (res.data.status === 200) {
          reset(res.data.data); // fill form with fetched data
        } else {
          toast.error(res.data.message || "Category not found");
          navigate("/admin/categories");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Failed to fetch category.");
        navigate("/admin/categories");
      }
    };

    fetchCategory();
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`${apiUrl}categories/${id}`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      if (res.data.status === 200) {
        toast.success(res.data.message);
        navigate("/admin/categories");
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between">
            <h4 className="h5">Categories / Edit</h4>
            <Link className="btn btn-primary btn-sm" to="/admin/categories">
              Back
            </Link>
          </div>
          <hr />

          {/* Form Start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Name */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    {...register("name", {
                      required: "The Name field is required",
                    })}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    type="text"
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
                </div>
              </div>

              {/* Slug */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Slug</label>
                  <input
                    {...register("slug", {
                      required: "The Slug field is required",
                    })}
                    className={`form-control ${
                      errors.slug ? "is-invalid" : ""
                    }`}
                    type="text"
                    placeholder="Slug"
                  />
                  {errors.slug && (
                    <p className="invalid-feedback">{errors.slug.message}</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    {...register("status")}
                    className="form-control"
                  >
                    <option value="1">Active</option>
                    <option value="0">Block</option>
                  </select>
                </div>
              </div>

              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
          {/* Form End */}
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
