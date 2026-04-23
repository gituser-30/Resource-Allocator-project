import React, { useEffect } from "react";
import anime from "animejs";
import "./thingsWeShare.css";

const ThingsWeShare = () => {
  const items = [
    {
      icon: "fas fa-book-open",
      title: "Study Notes",
      desc: "Well-organized notes for all branches and years to help you revise quickly and effectively.",
      color: "#a855f7",
    },
    {
      icon: "fas fa-file-alt",
      title: "Previous Year Papers",
      desc: "Collection of PYQs with solutions to help you prepare for exams with confidence.",
      color: "#00e5ff",
    },
    {
      icon: "fas fa-pen-nib",
      title: "Assignments & Solutions",
      desc: "Download assignments with detailed solutions for deeper understanding of concepts.",
      color: "#fbbf24",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Project Ideas",
      desc: "Explore innovative project ideas and resources to enhance your technical portfolio.",
      color: "#f472b6",
    },
    {
      icon: "fas fa-bullseye",
      title: "Career Guidance",
      desc: "Tips, interview prep resources, and learning paths to shape your professional career.",
      color: "#34d399",
    },
    {
      icon: "fas fa-video",
      title: "Video Tutorials",
      desc: "Curated video courses and playlists from top educators to supplement your learning.",
      color: "#3b82f6",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.tws__card',
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 700,
              delay: anime.stagger(100),
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    const section = document.getElementById('tws-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tws" id="tws-section">
      <div className="container">
        {/* Heading */}
        <div className="section-heading">
          <h2 className="gradient-text">What We Offer</h2>
          <p>
            Our mission is to make learning simple and accessible for every DBATU scholar.
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Cards Grid */}
        <div className="tws__grid">
          {items.map((item, index) => (
            <div className="tws__card glass-card" key={index} style={{ '--tws-color': item.color }}>
              <div className="tws__card-icon-wrapper">
                <i className={item.icon} style={{ color: item.color }}></i>
              </div>
              <h4 className="tws__card-title">{item.title}</h4>
              <p className="tws__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThingsWeShare;
