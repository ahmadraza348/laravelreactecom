import React from "react";

import LatestProducts from "./common/LatestProducts";
import FeaturedProducts from "./common/FeaturedProducts";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Hero from "./common/Hero";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <LatestProducts />
      <FeaturedProducts />

      <Footer />
    </>
  );
};

export default Home;
