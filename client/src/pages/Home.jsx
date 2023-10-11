import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import styled from "styled-components";
const WrapHome = styled.div`

  display: grid;
`;
const Home = () => {
  return (
    <WrapHome>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </WrapHome>
  );
};

export default Home;
