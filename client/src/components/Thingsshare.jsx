import React from "react";
import { motion } from "framer-motion";
import "./thingsWeShare.css";

const ThingsWeShare = () => {
  const items = [
    {
      icon: "fas fa-book-open",
      title: "Study Notes",
      desc: "Comprehensive, high-quality notes for all DBATU branches, curated by top-performing students.",
      color: "#a855f7",
    },
    {
      icon: "fas fa-file-alt",
      title: "Previous Year Papers",
      desc: "Master your exams with our exhaustive collection of solved PYQs and question patterns.",
      color: "#00e5ff",
    },
    {
      icon: "fas fa-pen-nib",
      title: "Assignments & Solutions",
      desc: "Get step-by-step solutions for your academic assignments to improve your understanding.",
      color: "#fbbf24",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Project Ideas",
      desc: "Fuel your creativity with innovative project concepts and implementation guides.",
      color: "#f472b6",
    },
    {
      icon: "fas fa-bullseye",
      title: "Career Guidance",
      desc: "Strategic advice and resources to help you navigate your path from campus to corporate.",
      color: "#34d399",
    },
    {
      icon: "fas fa-video",
      title: "Video Tutorials",
      desc: "Bite-sized, expert-led video lessons to simplify complex engineering concepts.",
      color: "#3b82f6",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="tws" id="tws-section">
      {/* Background Video for Section */}
      <div className="tws__bg-video">
        <video autoPlay muted loop playsInline>
          <source 
            src="https://videos.pexels.com/video-files/7568551/7568551-uhd_2560_1440_24fps.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="tws__overlay"></div>
      </div>

      <div className="container tws__container">
        {/* Heading */}
        <div className="section-heading tws__heading">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-text"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Empowering DBATU scholars with premium digital resources for academic excellence.
          </motion.p>
          <div className="section-divider"></div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          className="tws__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, index) => (
            <motion.div 
              className="tws__card glass-card" 
              key={index} 
              style={{ '--tws-color': item.color }}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                transition: { duration: 0.3 } 
              }}
            >
              <div className="tws__card-glow" style={{ backgroundColor: item.color }}></div>
              <div className="tws__card-icon-wrapper">
                <i className={item.icon} style={{ color: item.color }}></i>
              </div>
              <h4 className="tws__card-title">{item.title}</h4>
              <p className="tws__card-desc">{item.desc}</p>
              
              <div className="tws__card-footer">
                <span className="learn-more">Explore More</span>
                <i className="fas fa-chevron-right"></i>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ThingsWeShare;

