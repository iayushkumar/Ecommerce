import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import Image1 from "../../Assets/1.jpg"
import Image2 from "../../Assets/2.jpg"


const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Special Sale",
    description: "From Rs.200 or Rs.2000.",
    description2: "From Rs.2000 or Rs.4000.",
  },
  {
    id: 2,
    img: Image2,
    title: "Special Sale",
    description: "From 300 or 4999.",
    description2: "From Rs.1999 or Rs.3999.",
  },
 
  {
    id: 3,
    img: Image1,
    title: "Special Sale",
    description: "From 1999 or 3999.",
    description2: "From Rs.1999 or Rs.3999.",
  },

];

const Hero = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="w-full m-auto grid  h-96 mb-5  p-2">
      <div className=" rounded-lg overflow-hidden w-full h-full ">
        <Slider {...settings} className="">
          {ImageList.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden flex items-center justify-center h-1/4  w-full relative"
            >
              <img src={item.img} alt="" className="rounded-lg h-[100%] w-full" />
              <div className="flex absolute top-24 sm:top-20 sm:left-10 left-60 md:top-24 md:left-60 lg:left-60 flex-col">
                <h2 className="text-xl sm:text-3xl md:text-5xl font-bold my-4">
                  {item.title}
                </h2>
                <p className="text-[12px] sm:text-sm font-medium">
                  {item.description}
                </p>
                <Link to="/viewproducts">
                <button className="bg-gradient-to-r from-red-400 to-red-600 hover:scale-105 duration-200 text-white py-2 my-4 sm:my-10 w-20 sm:w-40 rounded-full text-[12px] sm:text-sm">
                  BUY NOW
                </button>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      </div>
     

  );
};

export default Hero;
