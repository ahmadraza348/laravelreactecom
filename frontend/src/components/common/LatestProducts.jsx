import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "./http";
import loadingGif from "../../assets/loading.gif";


const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch products
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}latest-products`);
        if (res.data.status === 200) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="pt-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row">
          {loading ? (
            <div className="text-center py-5">
                         <img src={loadingGif} alt="" />
                       </div>
          ) : products.length > 0 ? (
            products.map((product) => {
              // make the correct image path
              const imageUrl =
                apiUrl.replace("api/", "") +
                "uploads/products/large/" +
                product.image;

              return (
                <div className="col-md-3 my-3" key={product.id}>
                  <div className="card border-0">
                    <div className="card-img">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-100"
                      />
                    </div>
                    <div className="card-body pt-3">
                      <h5>{product.title}</h5>
                      <div>
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
              );
            })
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
