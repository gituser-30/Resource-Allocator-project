import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode, FaProjectDiagram, FaBuilding, FaBolt, FaMicrochip, FaAtom } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProSlider.css";

const ProSlider = () => {
  const navigate = useNavigate();

  const featuredItems = [
    {
      name: "Computer Engineering",
      icon: <FaLaptopCode />,
      color: "#a855f7",
      path: "computer-engineering",
      tag: "Popular",
      stats: "120+ Notes"
    },
    {
      name: "Information Technology",
      icon: <FaProjectDiagram />,
      color: "#00e5ff",
      path: "it-engineering",
      tag: "Trending",
      stats: "95+ Notes"
    },
    {
      name: "Civil Engineering",
      icon: <FaBuilding />,
      color: "#fbbf24",
      path: "civil-engineering",
      tag: "New",
      stats: "80+ Notes"
    },
    {
      name: "Electrical Engineering",
      icon: <FaBolt />,
      color: "#f472b6",
      path: "electrical-engineering",
      tag: "Hot",
      stats: "110+ Notes"
    },
    {
      name: "Electronics & TC",
      icon: <FaMicrochip />,
      color: "#34d399",
      path: "electronics-engineering",
      tag: "Pro",
      stats: "75+ Notes"
    },
    {
      name: "Mechanical Engineering",
      icon: <FaAtom />,
      color: "#3b82f6",
      path: "mechanical-engineering",
      tag: "Best",
      stats: "150+ Notes"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
        }
      }
    ]
  };

  const handleCardClick = (path, name) => {
    navigate(`/notes/${path}`, { state: { department: name } });
  };

  return (
    <section className="pro-slider-section" id="featured-slider">
      <div className="container">
        <div className="pro-slider__header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-text"
          >
            Premium Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore our most accessed departments with top-rated materials
          </motion.p>
        </div>

        <div className="pro-slider__wrapper">
          <Slider {...settings}>
            {featuredItems.map((item, index) => (
              <div key={index} className="pro-slider__slide">
                <motion.div 
                  className="pro-card glass-card"
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleCardClick(item.path, item.name)}
                  style={{ '--card-color': item.color }}
                >
                  <div className="pro-card__badge" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                    {item.tag}
                  </div>
                  
                  <div className="pro-card__icon-container">
                    <div className="pro-card__icon" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <div className="pro-card__icon-glow" style={{ backgroundColor: item.color }}></div>
                  </div>

                  <div className="pro-card__content">
                    <h3 className="pro-card__title">{item.name}</h3>
                    <div className="pro-card__footer">
                      <span className="pro-card__stats">{item.stats}</span>
                      <div className="pro-card__arrow">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>

                  <div className="pro-card__border-glow"></div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProSlider;
