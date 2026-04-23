import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import anime from "animejs";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    dob: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: '.forgot__box',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
      })
      .add({
        targets: '.forgot__form-group',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600
      }, '-=400');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: formData.email,
          dob: formData.dob,
          newPassword: formData.newPassword
        }
      );

      if (res.data.success) {
        setMessage("✅ Password reset successful!");
        setMessageType("success");

        anime({
          targets: '.forgot__box',
          scale: 0.95,
          opacity: 0,
          delay: 2000,
          duration: 400,
          easing: 'easeInBack',
          complete: () => navigate("/login")
        });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed. Please check your details.");
      setMessageType("error");
      setLoading(false);

      anime({
        targets: '.forgot__box',
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 400,
        easing: 'easeInOutSine'
      });
    }
  };

  return (
    <div className="forgot">
      <div className="forgot__orb forgot__orb--1"></div>
      <div className="forgot__orb forgot__orb--2"></div>

      <div className="forgot__container">
        <div className="forgot__box glass-card">
          <div className="forgot__header">
            <h2 className="forgot__title">Reset Password</h2>
            <p className="forgot__subtitle">Verify your identity using your Date of Birth</p>
          </div>

          {message && (
            <div className={`forgot__message-box ${messageType === "success" ? "forgot__message-box--success" : "forgot__message-box--error"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="forgot__form">
            <div className="forgot__form-group">
              <label className="forgot__label">Email Address</label>
              <div className="forgot__input-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  className="forgot__input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="forgot__form-group">
              <label className="forgot__label">Date of Birth</label>
              <div className="forgot__input-wrapper">
                <i className="fas fa-calendar-alt"></i>
                <input
                  type="date"
                  name="dob"
                  className="forgot__input"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="forgot__form-row">
              <div className="forgot__form-group">
                <label className="forgot__label">New Password</label>
                <div className="forgot__input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    name="newPassword"
                    className="forgot__input"
                    placeholder="••••••••"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="forgot__form-group">
                <label className="forgot__label">Confirm Password</label>
                <div className="forgot__input-wrapper">
                  <i className="fas fa-shield-alt"></i>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="forgot__input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button className="forgot__btn btn-primary-glow w-full" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Update Password"}
              <i className="fas fa-sync-alt"></i>
            </button>
          </form>

          <div className="forgot__footer">
            <p>Remember your password? <Link to="/login" className="forgot__link">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
