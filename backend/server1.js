const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// Load environment variables from .env file
require("dotenv").config(); 

// --- 1. Import Modules and Routes ---
const Admin = require("./models/Admin"); // <-- NECESSARY FOR ADMIN CREATION
const adminRoutes = require("./routes/admin"); // Login and Dashboard Counts
const userRoutes = require("./routes/user");   // User Management (List & Delete)
const assignmentRoutes = require("./routes/assignment"); // Assignments CRUD
const notesRoutes = require("./routes/note");       // Notes CRUD
const pyqRoutes = require("./routes/pyq");         // PYQs CRUD


const app = express();
const PORT = process.env.PORT || 5000;


// --- 2. Middleware Setup ---
app.use(cors());
// Middleware to parse JSON bodies (for login, delete, etc.)
app.use(express.json());
// Middleware to parse URL-encoded bodies (not strictly needed here but good practice)
app.use(express.urlencoded({ extended: true }));


// --- 3. Static File Serving (PDF Fix) ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// --- 4. Route Mounting ---
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/admin/assignments", assignmentRoutes);
app.use("/api/admin/notes", notesRoutes);
app.use("/api/admin/pyqs", pyqRoutes);


// --- 5. Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    let message = err.message || "Something went wrong on the server.";
    let statusCode = err.status || 500;

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = "Invalid or expired token. Please log in again.";
    }
    
    res.status(statusCode).json({ 
        error: true,
        message: message 
    });
});


// =========================================================
// --- TEMPORARY ADMIN CREATION LOGIC ---
// This function runs ONCE to ensure the test admin exists.
// DELETE THIS SECTION AFTER YOU SEE THE SUCCESS MESSAGE.
// =========================================================
const createSpecificAdmin = async () => {
    const desiredEmail = "admin@gmail.com";
    const desiredPassword = "admin@123";

    try {
        const adminExists = await Admin.findOne({ email: desiredEmail });

        if (!adminExists) {
            await Admin.create({
                email: desiredEmail,
                password: desiredPassword,
                fullName: "Primary Admin",
            });
            console.log(`\n✅ Specific Admin Account Created for testing: ${desiredEmail} / ${desiredPassword}\n`);
        } else {
            console.log(`\n⚠️ Admin Account Already Exists: ${desiredEmail}\n`);
        }
    } catch (error) {
        console.error("Critical: Failed to check or create specific admin account.", error);
    }
};


// --- 6. Database Connection & Server Start ---
mongoose.connect(process.env.MONGO_URI)
.then(async () => { 
    console.log("MongoDB connected ✅");
    
    // 6.1. RUN THE TEMPORARY CREATION FUNCTION
    await createSpecificAdmin(); 
    
    // 6.2. START SERVER ONLY AFTER DB CONNECTS AND ADMIN IS CHECKED
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
})
.catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); 
});  