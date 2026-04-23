import React, { useEffect } from "react";
import anime from "animejs";
import "./popular.css";

const Popular = () => {
  const trending = [
    {
      title: "All Subjects – Complete Notes",
      desc: "Best rated notes curated by top DBATU students across all departments",
      tag: "Trending",
      icon: "🔥",
      color: "#a855f7",
    },
    {
      title: "All Subjects – Assignments",
      desc: "Comprehensive assignment collection with solutions for every semester",
      tag: "Most Downloaded",
      icon: "⭐",
      color: "#00e5ff",
    },
    {
      title: "PYQs – All Departments",
      desc: "Previous year question papers to boost your exam preparation strategy",
      tag: "Student Favorite",
      icon: "❤️",
      color: "#f472b6",
    },
  ];

  const playlists = [
    {
      title: "Web Development Full Course",
      link: "https://www.youtube.com/embed/tVzUXW6siu0",
      channel: "Complete Beginner to Pro",
    },
    {
      title: "JavaScript Crash Course",
      link: "https://www.youtube.com/embed/O3iR-CIufKM",
      channel: "Hindi Tutorial",
    },
    {
      title: "DSA with Java – Playlist",
      link: "https://www.youtube.com/embed/videoseries?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
      channel: "Complete Data Structures",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.popular__trend-card',
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 800,
              delay: anime.stagger(150),
              easing: 'easeOutExpo',
            });
            anime({
              targets: '.popular__video-card',
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 800,
              delay: anime.stagger(150, { start: 400 }),
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    const section = document.getElementById('popular-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="popular" id="popular-section">
      <div className="container">
        {/* Heading */}
        <div className="section-heading">
          <h2 className="gradient-text">Popular on Scholar Hub</h2>
          <p>Most accessed study resources by DBATU students</p>
          <div className="section-divider"></div>
        </div>

        {/* Trending Cards */}
        <div className="popular__trend-grid">
          {trending.map((item, i) => (
            <div
              className="popular__trend-card glass-card"
              key={i}
              style={{ '--trend-color': item.color }}
              id={`trend-card-${i}`}
            >
              <div className="popular__trend-header">
                <span className="popular__trend-icon">{item.icon}</span>
                <span
                  className="popular__trend-badge"
                  style={{ background: `${item.color}20`, color: item.color }}
                >
                  {item.tag}
                </span>
              </div>
              <h4 className="popular__trend-title">{item.title}</h4>
              <p className="popular__trend-desc">{item.desc}</p>
              <div className="popular__trend-bar">
                <div
                  className="popular__trend-fill"
                  style={{ background: item.color, width: `${85 - i * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="popular__video-heading">
          <h3>
            <i className="fas fa-play-circle" style={{ color: 'var(--accent-cyan)' }}></i>
            {" "}Recommended Tutorials
          </h3>
          <p>Handpicked video courses to accelerate your learning</p>
        </div>

        <div className="popular__video-grid">
          {playlists.map((item, index) => (
            <div className="popular__video-card glass-card" key={index} id={`video-card-${index}`}>
              <div className="popular__video-frame">
                <iframe
                  src={item.link}
                  title={item.title}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="popular__video-info">
                <h5>{item.title}</h5>
                <span>{item.channel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
