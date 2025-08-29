import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "./http";
import ProductImg from "../../assets/images/eight.jpg"; // fallback image

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest products (no auth needed)
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}latest-products`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === 200) {
        setProducts(res.data.data); // adjust if your controller returns a different structure
      } else {
        console.warn("Unexpected API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching latest products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="section-2 pt-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.slice(0, 4).map((product) => ( // show only latest 4
              <div className="col-md-3 my-3" key={product.id}>
                <div className="product card border-0">
                  <div className="card-img">
                    <img
                      src={
                        product.image
                          ? `${apiUrl}uploads/products/small/${product.image}`
                          : ProductImg
                      }
                      alt={product.title}
                      className="w-100"
                    />
                  </div>
                  <div className="card-body pt-3">
                    <a href="#">{product.title}</a>
                    <div className="price">
                      ${product.sale_price ?? product.price}
                      {product.sale_price && (
                        <span className="text-decoration-line-through ms-2">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
