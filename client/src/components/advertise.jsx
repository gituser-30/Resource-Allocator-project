import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { useNavigate } from "react-router-dom";
import "./advertise.css";
import axios from "axios";

const Advertise = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const [userno, setUserno] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        // Use standard 'token' since login stores it as 'token'
        const token = localStorage.getItem("token") || localStorage.getItem("usertoken");
        const res = await axios.get("https://resource-allocator-project.onrender.com/api/admin/users/count", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.success) {
          setUserno(res.data.count);
        }
      } catch (err) {
        console.error("Failed to fetch user count:", err);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    // Staggered text reveal
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({
      targets: '.hero__badge',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    })
      .add({
        targets: '.hero__title .word',
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 1000,
        delay: anime.stagger(120),
      }, '-=400')
      .add({
        targets: '.hero__subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
      }, '-=600')
      .add({
        targets: '.hero__actions > *',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100),
      }, '-=400')
      .add({
        targets: '.hero__stats-item',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100),
      }, '-=300');

    // Floating orbs animation
    anime({
      targets: '.hero__orb',
      translateY: [-20, 20],
      translateX: [-10, 10],
      scale: [1, 1.1],
      duration: 4000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(600),
    });
  }, []);

  useEffect(() => {
    // Counter animation - we re-run this when userno updates so it correctly animates the fetched value
    document.querySelectorAll('.hero__stat-number').forEach((el) => {
      const target = parseInt(el.getAttribute('data-target')) || 0;
      if (target > 0) {
        anime({
          targets: el,
          innerHTML: [0, target],
          round: 1,
          duration: 2000,
          delay: 200,
          easing: 'easeOutExpo',
        });
      }
    });
  }, [userno]);

  return (
    <section className="hero" ref={heroRef} id="hero-section">
      {/* Video Background */}
      <div className="hero__video-wrapper">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
        >
          <source
            src="/videos/hero-bg.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero__overlay"></div>
      </div>

      {/* Floating Orbs */}
      <div className="hero__orb hero__orb--1"></div>
      <div className="hero__orb hero__orb--2"></div>
      <div className="hero__orb hero__orb--3"></div>

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          Trusted by 90+ DBATU Students
        </div>

        <h1 className="hero__title" ref={titleRef}>
          <span className="word">Your</span>{" "}
          <span className="word gradient-text">Academic</span>{" "}
          <span className="word">Journey</span>
          <br />
          <span className="word">Starts</span>{" "}
          <span className="word gradient-text">Here.</span>
        </h1>

        <p className="hero__subtitle">
          Access curated notes, PYQs, assignments & video tutorials —
          all in one modern platform built for DBATU scholars.
        </p>

        <div className="hero__actions">
          <button
            className="btn-primary-glow"
            onClick={() => navigate('/notes')}
            id="hero-explore-btn"
          >
            <i className="fas fa-rocket"></i>
            Explore Materials
          </button>
          <button
            className="btn-outline-glow"
            onClick={() => navigate('/about-us')}
            id="hero-learn-btn"
          >
            Learn More
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        {/* Stats Row */}
        <div className="hero__stats">
          <div className="hero__stats-item">
            <span className="hero__stat-number" data-target={userno}>0</span>
            <span className="hero__stat-suffix">+</span>
            <span className="hero__stat-label">Active Students</span>
          </div>
          <div className="hero__stats-divider"></div>
          <div className="hero__stats-item">
            <span className="hero__stat-number" data-target="300+">0</span>
            <span className="hero__stat-suffix">+</span>
            <span className="hero__stat-label">Study Materials</span>
          </div>
          <div className="hero__stats-divider"></div>
          <div className="hero__stats-item">
            <span className="hero__stat-number" data-target="5+">0</span>
            <span className="hero__stat-suffix"></span>
            <span className="hero__stat-label">Departments</span>
          </div>
          <div className="hero__stats-divider"></div>
          <div className="hero__stats-item">
            <span className="hero__stat-number" data-target="100+">0</span>
            <span className="hero__stat-suffix">+</span>
            <span className="hero__stat-label">Downloads</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Advertise;
