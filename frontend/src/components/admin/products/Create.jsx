import React, { useState, useRef, useMemo, useEffect } from "react";
import Layout from "../../common/adminLayout/Layout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import JoditEditor from "jodit-react";
import { apiUrl, token } from "../../common/http";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imageId, setImageId] = useState(null);

  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Description",
    }),
    [placeholder]
  );

  // Fetch categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          fetch(apiUrl + "categories", {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token()}`,
            },
          }),
          fetch(apiUrl + "brands", {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token()}`,
            },
          }),
        ]);

        const catData = await catRes.json();
        const brandData = await brandRes.json();

        if (catData.status && Array.isArray(catData.data)) {
          setCategories(catData.data);
        }
        if (brandData.status && Array.isArray(brandData.data)) {
          setBrands(brandData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load categories or brands");
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.description = content;
      data.imageId = imageId;

      const res = await axios.post(`${apiUrl}products`, data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      if (res.data.status === 200) {
        toast.success(res.data.message);
        navigate("/admin/products");
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

    try {
      const res = await fetch(apiUrl + "temp-images", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      });
      const result = await res.json();

      if (result.status === false) {
        toast.error(result.error?.image?.[0] || "Image upload failed.");
      } else {
        setImageId(result.data.id);
        toast.success("Image uploaded successfully.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    }
  };

  return (
    <Layout>
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between">
            <h4 className="h5">Product / Create</h4>
            <Link className="btn btn-primary btn-sm" to="/admin/products">
              Back
            </Link>
          </div>
          <hr />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Title */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    {...register("title", {
                      required: "The title field is required",
                    })}
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    type="text"
                    placeholder="Title"
                  />
                  {errors.title && (
                    <p className="invalid-feedback">{errors.title.message}</p>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    {...register("price", { required: "Price is required" })}
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    type="number"
                    step="0.01"
                    placeholder="Price"
                  />
                  {errors.price && (
                    <p className="invalid-feedback">{errors.price.message}</p>
                  )}
                </div>
              </div>

              {/* Compare Price */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Compare Price</label>
                  <input
                    {...register("compare_price")}
                    className="form-control"
                    type="number"
                    step="0.01"
                    placeholder="Compare Price"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    {...register("qty")}
                    className="form-control"
                    type="number"
                    placeholder="Qty"
                  />
                </div>
              </div>

              {/* SKU */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">SKU</label>
                  <input
                    {...register("sku", { required: "SKU is required" })}
                    className={`form-control ${errors.sku ? "is-invalid" : ""}`}
                    type="text"
                    placeholder="SKU"
                  />
                  {errors.sku && (
                    <p className="invalid-feedback">{errors.sku.message}</p>
                  )}
                </div>
              </div>

              {/* Barcode */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Barcode</label>
                  <input
                    {...register("barcode")}
                    className="form-control"
                    type="text"
                    placeholder="Barcode"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className={`form-control ${
                      errors.category_id ? "is-invalid" : ""
                    }`}
                    {...register("category_id", {
                      required: "This field is required",
                    })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="invalid-feedback">
                      {errors.category_id.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Brand */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Brand</label>
                  <select className="form-control" {...register("brand_id")}>
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Image */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFile}
                  />
                </div>
              </div>
              {/* Short Description */}
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <textarea
                    {...register("short_description")}
                    className="form-control"
                    placeholder="Short Description"
                    rows={3}
                  ></textarea>
                </div>
              </div>

              {/* Full Description */}
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select {...register("status")} className="form-control">
                    <option value="1">Active</option>
                    <option value="0">Block</option>
                  </select>
                </div>
              </div>

              {/* Featured */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Featured</label>
                  <select {...register("is_featured")} className="form-control">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
