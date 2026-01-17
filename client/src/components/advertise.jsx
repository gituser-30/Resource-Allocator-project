// // import React from "react";
// // import Slider from "react-slick";
// // import "../components/advertise.css";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import banner2 from "../image/banner2.jpg";
// // import banner3 from "../image/banner3.jpg";


// // const Advertise = () => {
// //   const slides = [
// //     {
// //       img: "https://kce.ac.in/new/wp-content/uploads/2023/05/College-students-reveal-the-best-ways-to-get-ahead-in-engineering-1-1024x536.jpg",
// //       title: "We are the Engineers",
// //       subtitle: "The Future of the World",
// //     },
// //     {
// //       img: banner2,
// //       title: "Learn. Build. Innovate.",
// //       subtitle: "Shaping Tomorrow’s Technology",
// //     },
// //     {
// //       img: banner3,
// //       title: "DBATU Scholar Hub",
// //       subtitle: "Empowering Students with Knowledge",
// //     },
// //   ];

// //   const settings = {
// //     dots: true,
// //     infinite: true,
// //     autoplay: true,
// //     speed: 1000,
// //     autoplaySpeed: 4000,
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     arrows: false,
// //   };

// //   return (
// //     <Slider {...settings} className="advertise-slider">
// //       {slides.map((slide, idx) => (
// //         <div key={idx} className="advertise-slide">
// //           <img src={slide.img} alt={slide.title} className="advertise-img" />
// //           <div className="advertise-overlay">
// //             <h1 className="fw-bold">{slide.title}</h1>
// //             <h4 className="fw-light">{slide.subtitle}</h4>
// //           </div>
// //         </div>
// //       ))}
// //     </Slider>
// //   );
// // };

// // export default Advertise;

// import React from "react";
// import Slider from "react-slick";
// import "../components/advertise.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import banner2 from "../image/banner2.jpg";
// import banner3 from "../image/banner3.jpg";

// const Advertise = () => {
//   const slides = [
//     {
//       img: "https://kce.ac.in/new/wp-content/uploads/2023/05/College-students-reveal-the-best-ways-to-get-ahead-in-engineering-1-1024x536.jpg",
//       title: "We are the Engineers",
//       subtitle: "The Future of the World",
//     },
//     {
//       img: banner2,
//       title: "Learn. Build. Innovate.",
//       subtitle: "Shaping Tomorrow’s Technology",
//     },
//     {
//       img: banner3,
//       title: "DBATU Scholar Hub",
//       subtitle: "Empowering Students with Knowledge",
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     speed: 1000,
//     autoplaySpeed: 4000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     pauseOnHover: false,
//     fade: true, // smooth crossfade transition
//   };

//   return (
//     <Slider {...settings} className="advertise-slider">
//       {slides.map((slide, idx) => (
//         <div key={idx} className="advertise-slide">
//           <img src={slide.img} alt={slide.title} className="advertise-img" />
//           <div className="advertise-overlay">
//             <h1 className="fw-bold animate-fade">{slide.title}</h1>
//             <h4 className="fw-light animate-slide">{slide.subtitle}</h4>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default Advertise;

import React from "react";
import { motion } from "framer-motion";
import "../components/advertise.css";

const Advertise = () => {
  return (
    <div className="hero-section">

      {/* Animated Gradient Blobs */}
      <motion.div 
        className="blob blob1"
        animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div 
        className="blob blob2"
        animate={{ x: [0, -25, 25, 0], y: [0, 25, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div 
        className="blob blob3"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* Main Text */}
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          DBATU Scholar Hub
        </motion.h1>

        <motion.h3 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Learn • Explore • Innovate  
        </motion.h3>

        <motion.p 
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3 }}
        >
          A modern platform designed for DBATU students to boost learning 
          and academic collaboration.
        </motion.p>
      </div>

    </div>
  );
};

export default Advertise;
