import React, { useEffect } from "react";
import anime from "animejs";
import "./About.css";

const About = () => {
  useEffect(() => {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: '.about__header',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
      })
      .add({
        targets: '.about__section',
        opacity: [0, 1],
        translateY: [40, 0],
        delay: anime.stagger(200),
        duration: 800
      }, '-=400');
  }, []);

  const team = [
    {
      name: "Abdullah Asif Ali Hajwane",
      role: "Academic Lead",
      desc: "Topper since 1st year with a 9+ pointer. Abdullah provides high-quality notes for all subjects.",
      icon: "fas fa-user-graduate",
      color: "#a855f7"
    },
    {
      name: "Aryan Mandhare",
      role: "Full Stack Developer",
      desc: "Passionate developer experienced in building real-world web applications and MERN stack integration.",
      icon: "fas fa-code",
      color: "#00e5ff",
      links: [
        { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/aryan-mandhare-207014380" },
        { icon: "fas fa-globe", url: "https://aryanportfolio-r5lg.onrender.com/" }
      ]
    },
    {
      name: "Rashid Khopatkar",
      role: "Admin & Frontend Developer",
      desc: "Specializes in database management and frontend development. Ensures data security for the platform.",
      icon: "fas fa-user-shield",
      color: "#fbbf24"
    }
  ];

  return (
    <div className="about">
      {/* Background Orbs */}
      <div className="about__orb about__orb--1"></div>
      <div className="about__orb about__orb--2"></div>

      <div className="container">
        {/* Header */}
        <header className="about__header section-heading">
          <div className="about__logo-wrapper">
            <img src="Head_logo.png" alt="Logo" className="about__logo" />
          </div>
          <h1 className="gradient-text">About Us</h1>
          <p>
            Learn more about DBATU Scholar Hub, our mission, and the dedicated team
            working to bridge the gap in academic resources.
          </p>
          <div className="section-divider"></div>
        </header>

        {/* Content Sections */}
        <div className="about__sections">
          {/* Who we are */}
          <section className="about__section about__section--flex glass-card">
            <div className="about__info">
              <h3 className="about__subtitle">
                <i className="fas fa-university"></i>
                Who We Are
              </h3>
              <p>
                Established as a student-led initiative, <strong>DBATU Scholar Hub</strong> was created to
                centralize academic resources for students of Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere.
                We provide a single, reliable point of access for previous year question papers (PYQs),
                assignments, and comprehensive study materials.
              </p>
            </div>
            <div className="about__visual">
              <div className="about__card-stat">
                <span className="about__stat-num">DBATU</span>
                <span className="about__stat-label">University Portal</span>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <div className="about__grid">
            <section className="about__section glass-card">
              <h3 className="about__subtitle">
                <i className="fas fa-bullseye"></i>
                Our Mission
              </h3>
              <p>
                To empower students with easy access to high-quality academic resources,
                enabling them to excel in their studies and build a strong foundation for their careers.
              </p>
            </section>
            <section className="about__section glass-card">
              <h3 className="about__subtitle">
                <i className="fas fa-rocket"></i>
                Our Vision
              </h3>
              <p>
                To become the go-to academic portal for every DBATU student and eventually expand
                to serve students across other universities in the state.
              </p>
            </section>
          </div>

          {/* Team */}
          <section className="about__section">
            <h3 className="about__title-center">Meet the Team</h3>
            <div className="about__team-grid">
              {team.map((member, i) => (
                <div className="about__member glass-card" key={i} style={{ '--member-color': member.color }}>
                  <div className="about__member-icon" style={{ background: `${member.color}20`, color: member.color }}>
                    <i className={member.icon}></i>
                  </div>
                  <h4 className="about__member-name">{member.name}</h4>
                  <span className="about__member-role">{member.role}</span>
                  <p className="about__member-desc">{member.desc}</p>
                  {member.links && (
                    <div className="about__member-links">
                      {member.links.map((link, j) => (
                        <a href={link.url} target="_blank" rel="noreferrer" key={j} className="about__member-link">
                          <i className={link.icon}></i>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Closing */}
          <section className="about__closing text-center">
            <h2 className="gradient-text">"Together, we learn. Together, we grow."</h2>
            <p>
              DBATU Scholar Hub is more than just a platform — it’s a community
              for learners, built by learners. Join us in shaping the future of
              academic collaboration.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
