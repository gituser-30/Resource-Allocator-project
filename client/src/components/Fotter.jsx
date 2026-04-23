import React from "react";
import { FaLinkedinIn, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__grid">
          {/* Brand Section */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-ring">
                <span className="footer__logo-text">D</span>
              </div>
              <h3 className="footer__title">
                Scholar <span className="footer__title-accent">Hub</span>
              </h3>
            </div>
            <p className="footer__desc">
              Empowering DBATU students with a comprehensive platform for study materials, 
              assignments, and previous year papers. Learn, Share, and Grow together.
            </p>
            <div className="footer__socials">
              <a href="https://www.linkedin.com/in/rashid-khopatkar-74a238308/" target="_blank" rel="noreferrer" className="footer__social-link">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com/mandhare3243" target="_blank" rel="noreferrer" className="footer__social-link">
                <FaInstagram />
              </a>
              <a href="#" className="footer__social-link">
                <FaGithub />
              </a>
              <a href="#" className="footer__social-link">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__links-group">
            <h4 className="footer__subtitle">Quick Links</h4>
            <ul className="footer__links">
              <li><NavLink to="/home" className="footer__link">Home</NavLink></li>
              <li><NavLink to="/notes" className="footer__link">Study Material</NavLink></li>
              <li><NavLink to="/about-us" className="footer__link">About Us</NavLink></li>
              <li><NavLink to="/contact" className="footer__link">Contact</NavLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__links-group">
            <h4 className="footer__subtitle">Resources</h4>
            <ul className="footer__links">
              <li><NavLink to="/notes/computer-engineering" className="footer__link">Computer Engineering</NavLink></li>
              <li><NavLink to="/notes/it-engineering" className="footer__link">Information Technology</NavLink></li>
              <li><NavLink to="/notes/civil-engineering" className="footer__link">Civil Engineering</NavLink></li>
              <li><NavLink to="/notes/electrical-engineering" className="footer__link">Electrical Engineering</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__contact">
            <h4 className="footer__subtitle">Get in Touch</h4>
            <p className="footer__contact-item">
              <i className="fas fa-envelope"></i>
              <span>dbatuscholarhub@gmail.com</span>
            </p>
            <p className="footer__contact-item">
              <i className="fas fa-phone"></i>
              <span>+91 8856032177</span>
            </p>
            <p className="footer__contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>DBATU University, Lonere</span>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} <span className="footer__highlight">DBATU Scholar Hub</span>. 
            All Rights Reserved. Built with <i className="fas fa-heart" style={{color: '#f87171'}}></i> for Students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
