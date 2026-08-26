import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import anime from "animejs";
import { API_BASE_URL } from "../config/api";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP & Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  }, [step]);

  // Step 1: Request OTP Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });

      if (res.data.success) {
        setMessage("✅ OTP code sent to your registered email!");
        setMessageType("success");
        setStep(2);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP. Please check your email address.");
      setMessageType("error");
      anime({
        targets: '.forgot__box',
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 400,
        easing: 'easeInOutSine'
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit OTP & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (!otp || otp.length < 4) {
      setMessage("Please enter a valid OTP code.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password-otp`, {
        email,
        otp,
        newPassword
      });

      if (res.data.success) {
        setMessage("✅ Password reset successful! Redirecting to login...");
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
      setMessage(error.response?.data?.message || "Reset failed. Invalid or expired OTP.");
      setMessageType("error");

      anime({
        targets: '.forgot__box',
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 400,
        easing: 'easeInOutSine'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot">
      <div className="forgot__orb forgot__orb--1"></div>
      <div className="forgot__orb forgot__orb--2"></div>

      <div className="forgot__container">
        <div className="forgot__box glass-card">
          <div className="forgot__header">
            <h2 className="forgot__title">Forgot Password</h2>
            <p className="forgot__subtitle">
              {step === 1
                ? "Enter your email to receive a 6-digit verification code"
                : `Enter the OTP sent to ${email}`}
            </p>
          </div>

          {message && (
            <div className={`forgot__message-box ${messageType === "success" ? "forgot__message-box--success" : "forgot__message-box--error"}`}>
              {message}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="forgot__form">
              <div className="forgot__form-group">
                <label className="forgot__label">Registered Email Address</label>
                <div className="forgot__input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    className="forgot__input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="forgot__btn btn-primary-glow w-full" type="submit" disabled={loading}>
                {loading ? "Sending OTP..." : "Send Verification OTP"}
                <i className="fas fa-paper-plane" style={{ marginLeft: "8px" }}></i>
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="forgot__form">
              <div className="forgot__form-group">
                <label className="forgot__label">6-Digit OTP Code</label>
                <div className="forgot__input-wrapper">
                  <i className="fas fa-key"></i>
                  <input
                    type="text"
                    name="otp"
                    className="forgot__input"
                    placeholder="e.g. 123456"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    style={{ letterSpacing: "3px", fontWeight: "600" }}
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
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button className="forgot__btn btn-primary-glow w-full" type="submit" disabled={loading}>
                {loading ? "Resetting Password..." : "Update Password"}
                <i className="fas fa-check-circle" style={{ marginLeft: "8px" }}></i>
              </button>

              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => { setStep(1); setMessage(""); }}
                  style={{ background: "none", border: "none", color: "#60a5fa", textDecoration: "underline", cursor: "pointer", fontSize: "14px" }}
                >
                  ← Resend OTP or change email
                </button>
              </div>
            </form>
          )}

          <div className="forgot__footer">
            <p>Remember your password? <Link to="/login" className="forgot__link">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
