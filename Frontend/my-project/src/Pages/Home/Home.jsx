import React from "react";

import Hero from "../../components/Hero/Hero";

import Category from "../../components/Category/Category";
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer";

const Home = () => {
 
  return (
    <>
      <Navbar/>
      <Hero />
    
      <Category />
      <Footer/>
     
    </>
  );
};

export default Home;
