import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../common/adminLayout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post( `${apiUrl}brands`,
        data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        navigate("/admin/brands");
      }
      else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between">
              <h4 className="h5">Brand / Create</h4>
              <Link className="btn btn-primary btn-sm" to="/admin/brands">
                Back
              </Link>
            </div>
            <hr />

            {/* Form Start */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {/* Title */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      {...register("name", {
                        required: "The Name field is Required",
                      })}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      type="text"
                      placeholder="Title"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>
                </div>

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
                    <select className="form-control">
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
            {/* Form End */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Create;
