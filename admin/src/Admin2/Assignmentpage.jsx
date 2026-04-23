import React, { useState, useEffect } from "react";
import axios from "axios";
import { mergeSort, multiColumnSearch, paginate } from "../utils/dsa";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // DSA States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'subject', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Options
  const departments = [
    "Computer", "Mechanical", "Civil", "Electrical", "Information Technology", "Chemical Engineering", "ENTC"
  ];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Fetch assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        const cacheBuster = `?t=${new Date().getTime()}`;
        const res = await axios.get(`https://resource-allocator-project.onrender.com/api/admin/assignments${cacheBuster}`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            'Cache-Control': 'no-cache', 
            'Pragma': 'no-cache',
          },
        });
        setAssignments(res.data.assignments || res.data || []);
      } catch (err) {
        setError("Failed to fetch assignments ❌");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  // Add assignment
  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!department || !semester || !subject || !file || !title) {
      setError("All required fields must be filled ❌");
      return;
    }

    const formData = new FormData();
    formData.append("department", department);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("title", title);
    formData.append("file", file);

    try {
      const res = await axios.post("https://resource-allocator-project.onrender.com/api/admin/assignments", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setAssignments([...assignments, res.data.assignment]);
      setDepartment(""); setSemester(""); setSubject(""); setTitle(""); setFile(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add assignment ❌");
    }
  };

  // Delete assignment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await axios.delete(`https://resource-allocator-project.onrender.com/api/admin/assignments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (err) {
      alert("Failed to delete assignment ❌");
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // DSA Pipeline
  const filteredAssignments = multiColumnSearch(assignments, searchQuery, ['department', 'subject', 'title', 'semester']);
  const sortedAssignments = mergeSort(filteredAssignments, sortConfig.key, sortConfig.direction);
  const paginatedAssignments = paginate(sortedAssignments, currentPage, pageSize);
  const totalPages = Math.ceil(sortedAssignments.length / pageSize) || 1;

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "var(--text-secondary)" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px", animation: "pulse 2s infinite" }}>⏳</div>
        <p>Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Assignments Management</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Upload and manage assignments.</p>
        </div>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search subject, dept, title..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {error && <div style={{ padding: "16px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--danger)", color: "var(--danger)", borderRadius: "8px", marginBottom: "24px" }}>{error}</div>}

      {/* Upload Form */}
      <form className="glass-panel" style={{ padding: "24px", marginBottom: "32px" }} onSubmit={handleAddAssignment}>
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Upload New Assignment</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
          <select className="search-input" value={department} onChange={(e) => setDepartment(e.target.value)} required>
            <option value="">-- Department --</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="search-input" value={semester} onChange={(e) => setSemester(e.target.value)} required>
            <option value="">-- Semester --</option>
            {semesters.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="text" className="search-input" placeholder="Subject Name" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <input type="text" className="search-input" placeholder="Assignment Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="file" className="search-input" onChange={(e) => setFile(e.target.files[0])} accept="application/pdf" style={{ padding: "7px 16px" }} required />
        </div>
        <button type="submit" className="btn-primary" style={{ width: "200px" }}>Upload Assignment</button>
      </form>

      {/* Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('department')}>Dept {sortConfig.key === 'department' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('semester')}>Sem {sortConfig.key === 'semester' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('subject')}>Subject {sortConfig.key === 'subject' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('title')}>Title {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              <th style={{ cursor: 'default' }}>File</th>
              <th style={{ cursor: 'default' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssignments.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>No assignments match your criteria.</td></tr>
            ) : (
              paginatedAssignments.map((a) => (
                <tr key={a._id}>
                  <td>{a.department}</td>
                  <td>{a.semester}</td>
                  <td style={{ fontWeight: "500", color: "white" }}>{a.subject}</td>
                  <td>{a.title || "-"}</td>
                  <td>
                    <a href={`https://resource-allocator-project.onrender.com${a.fileUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-primary)", textDecoration: "none", fontWeight: "500" }}>View PDF</a>
                  </td>
                  <td><button className="btn-danger" onClick={() => handleDelete(a._id)}>Delete</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>Previous</button>
          <span className="page-info">Page <span style={{ color: "white", fontWeight: "600" }}>{currentPage}</span> of {totalPages}</span>
          <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Next</button>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
