import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import anime from "animejs";
import { FaLaptopCode, FaProjectDiagram, FaBuilding, FaBolt } from "react-icons/fa";
import "./Browse.css";

const Browse = () => {
  const navigate = useNavigate();

  const Branches = [
    {
      name: "Computer Engineering",
      icon: <FaLaptopCode />,
      color: "#a855f7",
      glow: "rgba(168,85,247,0.2)",
      path: "computer-engineering",
      desc: "Software, AI, Web & Systems",
    },
    {
      name: "Information Technology",
      icon: <FaProjectDiagram />,
      color: "#00e5ff",
      glow: "rgba(0,229,255,0.2)",
      path: "it-engineering",
      desc: "Networks, Security & Data",
    },
    {
      name: "Civil Engineering",
      icon: <FaBuilding />,
      color: "#fbbf24",
      glow: "rgba(251,191,36,0.2)",
      path: "civil-engineering",
      desc: "Structures, Design & Planning",
    },
    {
      name: "Electrical Engineering",
      icon: <FaBolt />,
      color: "#f472b6",
      glow: "rgba(244,114,182,0.2)",
      path: "electrical-engineering",
      desc: "Power, Circuits & Systems",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.browse__card',
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 800,
              delay: anime.stagger(120),
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('browse-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (branchPath, branchName) => {
    navigate(`/notes/${branchPath}`, { state: { department: branchName } });
  };

  return (
    <section className="browse" id="browse-section">
      <div className="container">
        {/* Heading */}
        <div className="section-heading">
          <h2 className="gradient-text">Browse Departments</h2>
          <p>
            Discover notes & study materials from different branches of DBATU.
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Cards Grid */}
        <div className="browse__grid">
          {Branches.map((branch, index) => (
            <div
              className="browse__card glass-card"
              key={index}
              onClick={() => handleCardClick(branch.path, branch.name)}
              style={{ '--card-color': branch.color, '--card-glow': branch.glow }}
              id={`browse-card-${branch.path}`}
            >
              <div className="browse__card-icon" style={{ color: branch.color }}>
                {branch.icon}
              </div>
              <h4 className="browse__card-name">{branch.name}</h4>
              <p className="browse__card-desc">{branch.desc}</p>
              <div className="browse__card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Browse;
