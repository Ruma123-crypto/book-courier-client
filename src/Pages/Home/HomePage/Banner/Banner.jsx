import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1Img from "../../../../assets/banner/banner1.jpg";
import banner2Img from "../../../../assets/banner/bannar2.jpg";
import banner3Img from "../../../../assets/banner/banner3.jpg";

const Banner = () => {
  return (
    <div className="w-full ">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        interval={3000}
      >

        {/* Slide 1 */}
        <div className="relative h-[450px] md:h-[550px]  w-full overflow-hidden">
          <img
            src={banner1Img}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 text-white">
            <h1 className="text-2xl md:text-5xl font-bold mb-3">
              The Book Haven
            </h1>
            <p className="text-sm md:text-lg mb-5 max-w-md">
              Discover thousands of books from different genres and authors in one place.
            </p>
            <a
              href="/all-books"
              className="bg-primary hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
            >
              View All Books
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
          <img
            src={banner2Img}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 text-white">
            <h1 className="text-2xl md:text-5xl font-bold mb-3">
              Read, Learn & Grow
            </h1>
            <p className="text-sm md:text-lg mb-5 max-w-md">
              Explore best-selling books and improve your knowledge every day.
            </p>
            <a
              href="/all-books"
              className="bg-primary hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
            >
              View All Books
            </a>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
          <img
            src={banner3Img}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 text-white">
            <h1 className="text-2xl md:text-5xl font-bold mb-3">
              Your Digital Library
            </h1>
            <p className="text-sm md:text-lg mb-5 max-w-md">
              Get access to premium books anytime, anywhere with fast delivery.
            </p>
            <a
              href="/all-books"
              className="bg-primary hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
            >
              View All Books
            </a>
          </div>
        </div>

      </Carousel>
    </div>
  );
};

export default Banner;