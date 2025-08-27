import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Shop from "./components/Shop"
import Product from "./components/Product"
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/admin/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import { AdminAuthProvider } from "./components/common/context/AdminAuth";
import Dashboard from "./components/admin/Dashboard";
import {default as AllCategories} from "./components/admin/categories/show";
import {default as CreateCategory} from "./components/admin/categories/create";
import {default as EditCategory} from "./components/admin/categories/Edit";


import {default as AllBrands} from "./components/admin/brands/show";
import {default as CreateBrand} from "./components/admin/brands/create";
import {default as EditBrand} from "./components/admin/brands/Edit";

import {default as AllProducts} from "./components/admin/products/show";
import {default as CreateProduct} from "./components/admin/products/create";
import {default as EditProduct} from "./components/admin/products/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin/dashboard" element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />

          <Route path="/admin/categories" element={
            <AdminRequireAuth>
              <AllCategories />
            </AdminRequireAuth>
          } />

          <Route path="/admin/category/create" element={
            <AdminRequireAuth>
              <CreateCategory />
            </AdminRequireAuth>
          } />

          
          <Route path="/admin/category/edit/:id" element={
            <AdminRequireAuth>
              <EditCategory />
            </AdminRequireAuth>
          } />

          {/* Brands */}
          <Route path="/admin/brands" element={
            <AdminRequireAuth>
              <AllBrands />
            </AdminRequireAuth>
          } />

          <Route path="/admin/brand/create" element={
            <AdminRequireAuth>
              <CreateBrand />
            </AdminRequireAuth>
          } />

          
          <Route path="/admin/brand/edit/:id" element={
            <AdminRequireAuth>
              <EditBrand />
            </AdminRequireAuth>
          } />



  {/* Products */}
          <Route path="/admin/products" element={
            <AdminRequireAuth>
              <AllProducts />
            </AdminRequireAuth>
          } />

          <Route path="/admin/product/create" element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          } />

          
          <Route path="/admin/product/edit/:id" element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          } />



        </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
        <ToastContainer />
    </>
  );
}

export default App;
