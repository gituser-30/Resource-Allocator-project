import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotesPage from "./Notespage";
import AssignmentsPage from "./Assignmentpage";
import PYQsPage from "./PYQpage";
import UsersPage from "./Userpage";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoverCard, setHoverCard] = useState(null);
  const [cardAnimate, setCardAnimate] = useState(false);

  const [stats, setStats] = useState([
    { title: "Total Users", value: 0, bg: "#2563eb", icon: "👤" },
    { title: "Assignments", value: 0, bg: "#1e40af", icon: "📄" },
    { title: "Notes", value: 0, bg: "#3b82f6", icon: "📝" },
    { title: "PYQs", value: 0, bg: "#60a5fa", icon: "📄" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const [usersRes, assignmentsRes, notesRes, pyqsRes] = await Promise.all([
          axios.get("https://resource-allocator-project.onrender.com/api/admin/users/count", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://resource-allocator-project.onrender.com/api/admin/assignments/count", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://resource-allocator-project.onrender.com/api/admin/notes/count", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://resource-allocator-project.onrender.com/api/admin/pyqs/count", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setStats([
          { title: "Total Users", value: usersRes.data.count, bg: "#2563eb", icon: "👤" },
          { title: "Assignments", value: assignmentsRes.data.count, bg: "#1e40af", icon: "📄" },
          { title: "Notes", value: notesRes.data.count, bg: "#3b82f6", icon: "📝" },
          { title: "PYQs", value: pyqsRes.data.count, bg: "#60a5fa", icon: "📄" },
        ]);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  useEffect(() => {
    setTimeout(() => setCardAnimate(true), 300);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Users", icon: "👥" },
    { name: "Assignments", icon: "📄" },
    { name: "Notes", icon: "📝" },
    { name: "PYQs", icon: "📄" },
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f3f6f9",
      overflowX: "hidden",
    },
    sidebar: {
      flexShrink: 0,
      width: sidebarOpen ? "240px" : "60px",
      background: "linear-gradient(to bottom, #1d4ed8, #2563eb)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      padding: "25px",
      boxShadow: "5px 0 20px rgba(0,0,0,0.2)",
      transition: "width 0.5s ease",
    },
    sidebarToggleBtn: {
      position: "absolute",
      top: "20px",
      right: "-15px",
      background: "#fbbf24",
      color: "#000",
      border: "none",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    sidebarTitle: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "35px",
      opacity: sidebarOpen ? 1 : 0,
      transition: "opacity 0.3s ease",
      whiteSpace: "nowrap",
    },
    menuItem: (isActive) => ({
      padding: "12px 15px",
      marginBottom: "12px",
      borderRadius: "12px",
      cursor: "pointer",
      backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
      transition: "all 0.3s ease",
      fontWeight: isActive ? "600" : "500",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }),
    mainContent: {
      flex: 1,
      padding: "30px 40px",
      transition: "margin-left 0.5s ease-in-out",
    },
    header: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      gap: "10px",
    },
    mainTitle: { fontSize: "26px", fontWeight: "700", color: "#333" },
    logoutBtn: {
      padding: "10px 18px",
      background: "#ef4444",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background 0.3s",
    },
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    statCard: (bgColor) => ({
      background: bgColor,
      color: "#fff",
      padding: "25px",
      border
