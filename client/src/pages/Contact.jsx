import React, { useState, useEffect } from "react";
import axios from "axios";
import anime from "animejs";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: '.contact__header',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
      })
      .add({
        targets: '.contact__card',
        opacity: [0, 1],
        translateY: [40, 0],
        delay: anime.stagger(200),
        duration: 800
      }, '-=400');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "info", message: "⏳ Sending your message..." });

    try {
      const res = await axios.post(
        "https://resource-allocator-project.onrender.com/contact",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setStatus({ type: "success", message: "✅ Message sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: "❌ Failed to send message. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "❌ Error sending message. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      {/* Background Orbs */}
      <div className="contact__orb contact__orb--1"></div>
      <div className="contact__orb contact__orb--2"></div>

      <div className="container">
        {/* Header */}
        <header className="contact__header section-heading">
          <h1 className="gradient-text">Get in Touch</h1>
          <p>
            Have questions, feedback, or need help? Send us a message and 
            we'll get back to you as soon as possible.
          </p>
          <div className="section-divider"></div>
        </header>

        <div className="contact__grid">
          {/* Contact Info */}
          <div className="contact__side">
            <div className="contact__info-cards">
              <div className="contact__card glass-card">
                <div className="contact__icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact__details">
                  <h4>Email Us</h4>
                  <p>dbatuscholarhub@gmail.com</p>
                </div>
              </div>

              <div className="contact__card glass-card">
                <div className="contact__icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact__details">
                  <h4>Call Us</h4>
                  <p>+91 8856032177</p>
                  <p>+91 9561017209</p>
                </div>
              </div>

              <div className="contact__card glass-card">
                <div className="contact__icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact__details">
                  <h4>Visit Us</h4>
                  <p>DBATU University, Lonere, Maharashtra</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="contact__map-wrapper glass-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4116.649812631768!2d73.33595807552913!3d18.169820082857015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be82e9b091399f5%3A0x2fac4343fa1e3cae!2sDr.%20Babasaheb%20Ambedkar%20Technological%20University!5e1!3m2!1sen!2sin!4v1757405076420!5m2!1sen!2sin"
                title="DBATU Location"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact__form-wrapper glass-card">
            <form onSubmit={handleSubmit} className="contact__form">
              <h3 className="contact__form-title">Send a Message</h3>
              
              {status.message && (
                <div className={`contact__status contact__status--${status.type}`}>
                  {status.message}
                </div>
              )}

              <div className="contact__form-group">
                <label className="contact__label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="contact__input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__form-group">
                <label className="contact__label">Your Email</label>
                <input
                  type="email"
                  name="email"
                  className="contact__input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__form-group">
                <label className="contact__label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="contact__input"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__form-group">
                <label className="contact__label">Message</label>
                <textarea
                  name="message"
                  className="contact__textarea"
                  placeholder="Tell us more..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="contact__btn btn-primary-glow" 
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
