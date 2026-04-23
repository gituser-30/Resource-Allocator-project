import React, { useState, useEffect } from "react";
import axios from "axios";
import { mergeSort, multiColumnSearch, paginate } from "../utils/dsa";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true); 

    // DSA States
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("adminToken"); 
            setIsLoading(true);

            if (!token) {
                setError("Authentication failed. Please log in again.");
                setIsLoading(false);
                return;
            }

            try {
                const cacheBuster = `?t=${new Date().getTime()}`;
                const res = await axios.get(`https://resource-allocator-project.onrender.com/api/admin/users${cacheBuster}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        'Cache-Control': 'no-cache', 
                        'Pragma': 'no-cache',
                    },
                });

                if (!res.data || !Array.isArray(res.data.users)) {
                    setError("Server returned an invalid data format.");
                    setUsers([]);
                    return;
                }

                setUsers(res.data.users); 
                setError(""); 
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Failed to load user data. Your session may have expired (401 error).");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []); 

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        
        const token = localStorage.getItem("adminToken");
        if (!token) {
             alert("Session token is missing.");
             return;
        }

        try {
            await axios.delete(`https://resource-allocator-project.onrender.com/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user._id !== id));
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete user ❌");
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Apply DSA pipeline: Search -> Sort -> Paginate
    const filteredUsers = multiColumnSearch(users, searchQuery, ['fullName', 'email']);
    const sortedUsers = mergeSort(filteredUsers, sortConfig.key, sortConfig.direction);
    const paginatedUsers = paginate(sortedUsers, currentPage, pageSize);
    const totalPages = Math.ceil(sortedUsers.length / pageSize) || 1;

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", padding: "50px", color: "var(--text-secondary)" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px", animation: "pulse 2s infinite" }}>⏳</div>
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                    <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Users Management</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Manage registered students on the platform.</p>
                </div>
                
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by name or email..." 
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset page on search
                    }}
                />
            </div>

            {error && <div style={{ padding: "16px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--danger)", color: "var(--danger)", borderRadius: "8px", marginBottom: "24px" }}>{error}</div>}

            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('fullName')}>
                                Full Name {sortConfig.key === 'fullName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th onClick={() => handleSort('email')}>
                                Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                            </th>
                            <th style={{ cursor: 'default' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.length === 0 ? (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                                    No users found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map((user) => (
                                <tr key={user._id}>
                                    <td style={{ fontWeight: "500", color: "white" }}>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn-danger" onClick={() => handleDelete(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        className="page-btn" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page <span style={{ color: "white", fontWeight: "600" }}>{currentPage}</span> of {totalPages}
                    </span>
                    <button 
                        className="page-btn" 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
