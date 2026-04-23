import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import all pages
import NotesPage from "./Notespage"
import AssignmentsPage from "./Assignmentpage";
import PYQsPage from "./PYQpage";
import UsersPage from "./Userpage";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Stats state
  const [stats, setStats] = useState([
    { title: "Total Users", value: 0, bg: "linear-gradient(135deg, #3b82f6, #2563eb)", icon: "👤" },
    { title: "Assignments", value: 0, bg: "linear-gradient(135deg, #10b981, #059669)", icon: "📄" },
    { title: "Notes", value: 0, bg: "linear-gradient(135deg, #8b5cf6, #7c3aed)", icon: "📝" },
    { title: "PYQs", value: 0, bg: "linear-gradient(135deg, #f59e0b, #d97706)", icon: "📄" },
  ]);

  // Fetch stats dynamically
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        const usersRes = await axios.get("https://resource-allocator-project.onrender.com/api/admin/users/count", headers);
        const assignmentsRes = await axios.get("https://resource-allocator-project.onrender.com/api/admin/assignments/count", headers);
        const notesRes = await axios.get("https://resource-allocator-project.onrender.com/api/admin/notes/count", headers);
        const pyqsRes = await axios.get("https://resource-allocator-project.onrender.com/api/admin/pyqs/count", headers);

        setStats([
          { title: "Total Users", value: usersRes.data.count, bg: "linear-gradient(135deg, #3b82f6, #2563eb)", icon: "👤" },
          { title: "Assignments", value: assignmentsRes.data.count, bg: "linear-gradient(135deg, #10b981, #059669)", icon: "📄" },
          { title: "Notes", value: notesRes.data.count, bg: "linear-gradient(135deg, #8b5cf6, #7c3aed)", icon: "📝" },
          { title: "PYQs", value: pyqsRes.data.count, bg: "linear-gradient(135deg, #f59e0b, #d97706)", icon: "📄" },
        ]);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Users", icon: "👥" },
    { name: "Assignments", icon: "📄" },
    { name: "Notes", icon: "📝" },
    { name: "PYQs", icon: "📄" },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Sidebar */}
      <div 
        className="glass-panel"
        style={{ 
          width: sidebarOpen ? "260px" : "80px", 
          margin: "16px",
          transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            top: "24px",
            right: "-14px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "var(--accent-primary)",
            color: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            zIndex: 100
          }}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        <div style={{ padding: "32px 20px", display: "flex", alignItems: "center", gap: "12px", overflow: "hidden" }}>
          <div style={{ fontSize: "28px", filter: "drop-shadow(0 0 8px rgba(59,130,246,0.5))" }}>🚀</div>
          <h2 style={{ 
            fontSize: "20px", 
            fontWeight: "700", 
            color: "white",
            opacity: sidebarOpen ? 1 : 0,
            whiteSpace: "nowrap",
            transition: "opacity 0.3s"
          }}>
            Admin<span style={{ color: "var(--accent-primary)" }}>Pro</span>
          </h2>
        </div>

        <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {menuItems.map((menu) => {
            const isActive = activeMenu === menu.name;
            return (
              <div 
                key={menu.name}
                onClick={() => setActiveMenu(menu.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "14px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: isActive ? "rgba(59, 130, 246, 0.2)" : "transparent",
                  color: isActive ? "white" : "var(--text-secondary)",
                  border: isActive ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "20px", width: "24px", textAlign: "center" }}>{menu.icon}</span>
                <span style={{ 
                  fontWeight: isActive ? "600" : "500",
                  opacity: sidebarOpen ? 1 : 0,
                  transition: "opacity 0.3s"
                }}>{menu.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "24px 32px 32px 16px", overflowY: "auto", height: "100vh" }}>
        
        <header style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "40px",
          padding: "16px 32px",
          background: "var(--glass-bg)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}>
          <h1 className="animate-fade-in" style={{ fontSize: "24px", fontWeight: "700" }}>{activeMenu}</h1>
          <button className="btn-danger" onClick={handleLogout}>Logout</button>
        </header>

        {activeMenu === "Dashboard" && (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
            gap: "24px",
            marginBottom: "40px"
          }}>
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="animate-fade-in"
                style={{ 
                  background: stat.bg,
                  padding: "24px", 
                  borderRadius: "20px", 
                  color: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  position: "relative",
                  overflow: "hidden",
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                {/* Decorative circle */}
                <div style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }} />
                
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{stat.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: "500", opacity: 0.9, marginBottom: "8px" }}>{stat.title}</h3>
                <p style={{ fontSize: "36px", fontWeight: "700" }}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Page Rendering */}
        <div className="glass-panel animate-fade-in" style={{ padding: "32px", minHeight: "500px" }}>
          {activeMenu === "Users" && <UsersPage />}
          {activeMenu === "Assignments" && <AssignmentsPage />}
          {activeMenu === "Notes" && <NotesPage />}
          {activeMenu === "PYQs" && <PYQsPage />}
          {activeMenu === "Dashboard" && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)" }}>
              <div style={{ fontSize: "64px", marginBottom: "24px" }}>📊</div>
              <h2 style={{ color: "white", marginBottom: "16px" }}>Welcome back, Admin!</h2>
              <p>Everything is running smoothly. Select a module from the sidebar to manage your resources.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
