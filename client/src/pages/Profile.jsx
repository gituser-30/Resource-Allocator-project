import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import anime from "animejs";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setForm(parsedUser);

      // Entry animation
      anime({
        targets: '.profile__container',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo'
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const userId = user._id || user.id;
      const res = await axios.put(
        `https://resource-allocator-project.onrender.com/api/users/update-profile/${userId}`,
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setShowEdit(false);
        alert("Profile updated successfully ✅");
      } else {
        alert(res.data.msg || "Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const userId = user._id || user.id;
      const res = await axios.put(
        `https://resource-allocator-project.onrender.com/api/users/change-password/${userId}`,
        passwordData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        alert("Password changed successfully ✅");
        setShowPassword(false);
        setPasswordData({ oldPassword: "", newPassword: "" });
      } else {
        alert(res.data.msg || "Password change failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error changing password ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile">
      <div className="profile__orb profile__orb--1"></div>
      <div className="profile__orb profile__orb--2"></div>

      <div className="container">
        <div className="profile__container glass-card">
          {/* Header */}
          <div className="profile__header">
            <div className="profile__avatar-wrapper">
              <div className="profile__avatar-ring">
                <img
                  src={user.profilePhoto || "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"}
                  alt="Profile"
                  className="profile__img"
                  onError={(e) => (e.target.src = "https://ui-avatars.com/api/?name=" + user.fullName)}
                />
              </div>
            </div>
            <div className="profile__meta">
              <h2 className="profile__name">{user.fullName}</h2>
              <p className="profile__email">{user.email}</p>
              <div className="profile__badges">
                <span className="profile__badge">Student</span>
                {user.department && <span className="profile__badge profile__badge--cyan">{user.department}</span>}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="profile__info">
            <h3 className="profile__section-title">Personal Information</h3>
            <div className="profile__info-grid">
              <div className="profile__info-item">
                <span className="profile__label">Full Name</span>
                <p className="profile__value">{user.fullName}</p>
              </div>
              <div className="profile__info-item">
                <span className="profile__label">Email Address</span>
                <p className="profile__value">{user.email}</p>
              </div>
              <div className="profile__info-item">
                <span className="profile__label">Department</span>
                <p className="profile__value">{user.department || "Not specified"}</p>
              </div>
              <div className="profile__info-item">
                <span className="profile__label">Date of Birth</span>
                <p className="profile__value">
                  {user.dob ? new Date(user.dob).toLocaleDateString("en-GB") : "Not provided"}
                </p>
              </div>
              <div className="profile__info-item">
                <span className="profile__label">Member Since</span>
                <p className="profile__value">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB") : "Unknown"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="profile__actions">
            <button className="btn-outline-glow" onClick={() => setShowEdit(true)}>
              <i className="fas fa-edit"></i> Edit Profile
            </button>
            <button className="btn-outline-glow" onClick={() => setShowPassword(true)}>
              <i className="fas fa-key"></i> Change Password
            </button>
            <button className="profile__logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close" onClick={() => setShowEdit(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Full Name</label>
                <input
                  type="text"
                  className="modal-input"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div className="modal-field">
                <label>Department</label>
                <select
                  className="modal-input"
                  value={form.department || ""}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>
              <div className="modal-field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="modal-input"
                  value={form.dob ? new Date(form.dob).toISOString().split('T')[0] : ""}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={() => setShowEdit(false)}>Cancel</button>
              <button className="modal-btn-save" onClick={handleProfileUpdate} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPassword && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowPassword(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Old Password</label>
                <input
                  type="password"
                  className="modal-input"
                  placeholder="Enter old password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                />
              </div>
              <div className="modal-field">
                <label>New Password</label>
                <input
                  type="password"
                  className="modal-input"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={() => setShowPassword(false)}>Cancel</button>
              <button className="modal-btn-save" onClick={handleChangePassword} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
