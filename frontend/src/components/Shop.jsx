import React from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/eight.jpg";

const Shop = () => {
  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-4">
              <div className="card-body p-4">
                <h3 className="mb-3">Categories</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label className="ps-2" htmlFor="">
                      Men
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label className="ps-2" htmlFor="">
                      Women
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label className="ps-2" htmlFor="">
                      Kids
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card shadow border-0 mb-4">
              <div className="card-body p-4">
                <h3 className="mb-3">Brands</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label className="ps-2" htmlFor="">
                      Puma
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label className="ps-2" htmlFor="">
                      Killer
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label className="ps-2" htmlFor="">
                      Levis
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label className="ps-2" htmlFor="">
                      Flying Machine
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row pb-5">
              <div className="col-md-4 my-3 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through"> $80</span>
                    </div>
                  </div>
                </div>
              </div>
       
              <div className="col-md-4 my-3 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through"> $80</span>
                    </div>
                  </div>
                </div>
              </div>
       
              <div className="col-md-4 my-3 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through"> $80</span>
                    </div>
                  </div>
                </div>
              </div>
       
              <div className="col-md-4 my-3 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through"> $80</span>
                    </div>
                  </div>
                </div>
              </div>
       
              <div className="col-md-4 my-3 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through"> $80</span>
                    </div>
                  </div>
                </div>
              </div>
       
              <div className="col-md-4 my-3 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg} alt="" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className="price">
                      $50
                      <span className="text-decoration-line-through"> $80</span>
                    </div>
                  </div>
                </div>
              </div>
       
            
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
