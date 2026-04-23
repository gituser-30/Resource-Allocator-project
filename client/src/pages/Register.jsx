import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import anime from "animejs";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: '.register__side--left',
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 1000
      })
      .add({
        targets: '.register__box',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
      }, '-=600')
      .add({
        targets: '.register__form-group',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(80),
        duration: 600
      }, '-=400');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("dob", formData.dob);
      data.append("password", formData.password);
      if (profilePhoto) data.append("profilePhoto", profilePhoto);

      await axios.post(
        "https://resource-allocator-project.onrender.com/api/auth/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ Account created successfully!");
      setMessageType("success");
      
      anime({
        targets: '.register__box',
        scale: 0.95,
        opacity: 0,
        delay: 1500,
        duration: 400,
        easing: 'easeInBack',
        complete: () => navigate("/login")
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Please try again.");
      setMessageType("error");
      setLoading(false);
      
      anime({
        targets: '.register__box',
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 400,
        easing: 'easeInOutSine'
      });
    }
  };

  return (
    <div className="register">
      {/* Background Orbs */}
      <div className="register__orb register__orb--1"></div>
      <div className="register__orb register__orb--2"></div>

      <div className="register__container">
        {/* Left Side - Visual */}
        <div className="register__side register__side--left">
          <div className="register__visual-content">
            <div className="register__logo-large">
              <span className="register__logo-text-large">D</span>
            </div>
            <h1 className="register__visual-title">Join the <br /><span className="gradient-text">Community</span></h1>
            <p className="register__visual-desc">
              Create an account to contribute, download, and stay updated with the latest DBATU resources.
            </p>
            <div className="register__visual-features">
              <div className="register__feature">
                <i className="fas fa-check-circle"></i>
                <span>Unlimited Downloads</span>
              </div>
              <div className="register__feature">
                <i className="fas fa-check-circle"></i>
                <span>Personalized Profile</span>
              </div>
              <div className="register__feature">
                <i className="fas fa-check-circle"></i>
                <span>Study Collaboration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="register__side register__side--right">
          <div className="register__box glass-card">
            <div className="register__header">
              <h2 className="register__title">Create Account</h2>
              <p className="register__subtitle">Join 500+ students on Scholar Hub</p>
            </div>

            {message && (
              <div className={`register__message-box ${messageType === "success" ? "register__message-box--success" : "register__message-box--error"}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="register__form">
              <div className="register__form-row">
                <div className="register__form-group">
                  <label className="register__label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="register__input"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="register__form-group">
                  <label className="register__label">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="register__input"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="register__form-group">
                <label className="register__label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="register__input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="register__form-group">
                <label className="register__label">Profile Photo (Optional)</label>
                <div className="register__file-input">
                  <input type="file" accept="image/*" onChange={handleFileChange} id="profile-upload" hidden />
                  <label htmlFor="profile-upload" className="register__file-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>{profilePhoto ? profilePhoto.name : "Choose an image..."}</span>
                  </label>
                </div>
              </div>

              <div className="register__form-row">
                <div className="register__form-group">
                  <label className="register__label">Password</label>
                  <div className="register__input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="register__input"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button 
                      type="button" 
                      className="register__password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>
                <div className="register__form-group">
                  <label className="register__label">Confirm Password</label>
                  <div className="register__input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="register__input"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button 
                      type="button" 
                      className="register__password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>
              </div>

              <button className="register__btn btn-primary-glow w-full" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
                <i className="fas fa-user-plus"></i>
              </button>
            </form>

            <div className="register__footer">
              <p>Already have an account? <Link to="/login" className="register__link">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
