import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/mens/six.jpg";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod')
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)

    }
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-content="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>

          <div className="row">
            <div className="col-md-7">
              <h3 className="border-bottom pb-3">
                <strong> Billing Details</strong>
              </h3>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Address"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <h3 className="border-bottom pb-3">
                <strong> Items</strong>
              </h3>

              <table className="table">
                <tbody>
                  <tr>
                    <td width={100}>
                      <img src={ProductImg} width={80} alt="" />
                    </td>
                    <td width={600}>
                      <div>Dummy Produc Title</div>
                      <div className="d-flex align-items-center pt-3 ">
                        <span>$30</span>
                        <div className="ps-5">
                          <button className="btn btn-size mx-2">S</button>
                        </div>
                        <div className="ps-3">X 1</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="row justify-content-end">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <div>Sub Total: </div>
                    <div>$23</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>Shipping: </div>
                    <div>$3</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <div>
                      <strong>Grand Total: </strong>
                    </div>
                    <div>$26</div>
                  </div>
                </div>
              </div>

              <h3 className="border-bottom pb-3 pt-4">
                <strong> Payment Methods</strong>
              </h3>
              <div>
                <input onClick={handlePaymentMethod}
                  type="radio"
                  checked={paymentMethod == "stripe"}
                  value="stripe"
                  className="ms-3"
                />
                <label htmlFor="" className="form-label ps-2">
                  Stripe
                </label>

                <input onClick={handlePaymentMethod}
                  type="radio"
                  checked={paymentMethod == "cod"}
                  value="cod"
                  className="ms-3"
                />
                <label htmlFor="" className="form-label ps-2">
                  COD
                </label>
              </div>

              <div className="d-flex  py-3">
                <div className="btn btn-primary">Pay Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
