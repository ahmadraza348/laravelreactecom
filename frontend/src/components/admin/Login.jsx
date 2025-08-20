import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUrl } from "../common/http";
import { useNavigate } from "react-router-dom";
import Layout from "../common/Layout";
import { AdminAuthContext } from "../common/context/AdminAuth";
import axios from "axios"; // ✅ import axios

const Login = () => {
  const { login } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ axios automatically parses JSON response
      const res = await axios.post(`${apiUrl}admin/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === 200) {
        const adminInfo = {
          id: res.data.id,
          token: res.data.token,
          name: res.data.name,
        };
        login(adminInfo); // saves in context + localStorage
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // ✅ axios gives detailed error messages
      if (error.response) {
        // Server responded with a status other than 200
        toast.error(error.response.data.message || "Login failed!");
      } else if (error.request) {
        // Request was made but no response
        toast.error("No response from server. Please try again.");
      } else {
        // Something else went wrong
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="container my-5 d-flex justify-content-center">
        <div className="login-form my-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mb-3">Login Here</h4>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder="Email"
                    className={`form-control ${errors.email && "is-invalid"}`}
                  />
                  {errors.email && (
                    <p className="invalid-feedback">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    id="password"
                    type="password"
                    placeholder="Password"
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                  />
                  {errors.password && (
                    <p className="invalid-feedback">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
