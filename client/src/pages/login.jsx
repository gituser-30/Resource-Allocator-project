import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import anime from "animejs";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial animations
    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: '.login__side--left',
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 1000
      })
      .add({
        targets: '.login__box',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
      }, '-=600')
      .add({
        targets: '.login__form-group',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600
      }, '-=400');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://resource-allocator-project.onrender.com/api/auth/login",
        { email, password }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Success animation before navigating
        anime({
          targets: '.login__box',
          scale: 0.95,
          opacity: 0,
          duration: 400,
          easing: 'easeInBack',
          complete: () => navigate("/home")
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      setLoading(false);
      
      // Shake animation on error
      anime({
        targets: '.login__box',
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 400,
        easing: 'easeInOutSine'
      });
    }
  };

  return (
    <div className="login">
      {/* Background Orbs */}
      <div className="login__orb login__orb--1"></div>
      <div className="login__orb login__orb--2"></div>

      <div className="login__container">
        {/* Left Side - Visual */}
        <div className="login__side login__side--left">
          <div className="login__visual-content">
            <div className="login__logo-large">
              <span className="login__logo-text-large">D</span>
            </div>
            <h1 className="login__visual-title">Welcome Back to <br /><span className="gradient-text">Scholar Hub</span></h1>
            <p className="login__visual-desc">
              Your gateway to organized study materials, academic success, and community collaboration.
            </p>
            <div className="login__visual-stats">
              <div className="login__stat">
                <span className="login__stat-val">1200+</span>
                <span className="login__stat-lab">Notes</span>
              </div>
              <div className="login__stat">
                <span className="login__stat-val">500+</span>
                <span className="login__stat-lab">Students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login__side login__side--right">
          <div className="login__box glass-card">
            <div className="login__header">
              <h2 className="login__title">Sign In</h2>
              <p className="login__subtitle">Enter your credentials to access your account</p>
            </div>

            {error && <div className="login__error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="login__form">
              <div className="login__form-group">
                <label className="login__label">Email Address</label>
                <div className="login__input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    className="login__input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login__form-group">
                <div className="login__label-row">
                  <label className="login__label">Password</label>
                  <Link to="/forgot-password" title="Forgot Password?" className="login__forgot">Forgot?</Link>
                </div>
                <div className="login__input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="login__input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="login__password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <button className="login__btn btn-primary-glow w-full" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>

            <div className="login__footer">
              <p>Don't have an account? <Link to="/Register" className="login__link">Create one</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
