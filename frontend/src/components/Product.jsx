import React, { useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductImgOne from "../assets/images/mens/five.jpg";
import ProductImgTwo from "../assets/images/mens/six.jpg";
import ProductImgThree from "../assets/images/mens/seven.jpg";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);

  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Product
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              {/* Thumbs (small images) */}
              <div className="col-2">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  direction="vertical"
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  <SwiperSlide>
                    <img
                      src={ProductImgOne}
                      alt="thumb1"
                      height={100}
                      className="w-100"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={ProductImgTwo}
                      alt="thumb2"
                      height={100}
                      className="w-100"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={ProductImgThree}
                      alt="thumb3"
                      height={100}
                      className="w-100"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Main (large images) */}
              <div className="col-10">
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img src={ProductImgOne} alt="large1" className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={ProductImgTwo} alt="large2" className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={ProductImgThree} alt="large3" className="w-100" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h2>Dummy Product Title</h2>
            <div className="d-flex">
              <Rating readonly initialValue={rating} size={20} />
              <span className="pt-1 ps-2">10 Reviews</span>
            </div>
            <div className="price h3 py-3">
              $20 <span className="text-decoration-line-through">$18</span>
            </div>
            <div>
              Lorem ipsum dolor sit amet <br />
              consectetur adipisicing elit. Animi, autem <br /> inventore quasi
              rerum beatae fugiat.
            </div>
            <div className="pt-3">
              <strong>Select Size*</strong>
              <div className="sizes pt-2">
                <button className="btn btn-size mx-1">S</button>
                <button className="btn btn-size mx-1">M</button>
                <button className="btn btn-size mx-1">L</button>
                <button className="btn btn-size mx-1">XL</button>
              </div>
            </div>
            <div className="add-to-cart my-4">
              <div className="btn btn-primary text-uppercase">Add To Cart</div>
            </div>

            <hr />

            <div>
              <strong>SKU: </strong> NNKDFN
            </div>
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                Tab content for Description
              </Tab>
              <Tab eventKey="reviews" title="Reviews(10)">
                Tab content for Reviews
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
