import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "./http";
import ProductImg from "../../assets/images/eleven.jpg"; // fallback image
import loadingGif from "../../assets/loading.gif";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}featured-products`);
        if (res.data.status === 200) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="row">
          {loading ? (
            <div className="text-center py-5">
              <img src={loadingGif} alt="Loading..." />
            </div>
          ) : products.length > 0 ? (
            products.map((product) => {
              const imageUrl = product.image
                ? apiUrl.replace("api/", "") +
                  "uploads/products/large/" +
                  product.image
                : ProductImg;

              return (
                <div className="col-md-3 my-3" key={product.id}>
                  <div className="product card border-0">
                    <div className="card-img">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-100"
                        onError={(e) => (e.target.src = ProductImg)} // fallback if broken
                      />
                    </div>
                    <div className="card-body pt-3">
                      <a href="#">{product.title}</a>
                      <div className="price">
                        ${product.price}
                        {product.compare_price && (
                          <span className="text-decoration-line-through ms-2">
                            ${product.compare_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No featured products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
