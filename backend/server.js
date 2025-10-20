// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");


require("dotenv").config();

const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ====== MODELS ======
const Note = require("./models/Note");
const User = require("./models/User");
const Assignment = require("./models/Assignment")
const PYQ = require("./models/PYQ");


const app = express();





// Middleware
app.use(express.json());
app.use(cors()); // allow all origins while developing
app.use("/images", express.static(path.join(__dirname, "images")));

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);
const adminAuthRoutes = require("./routes/adminAuth");
app.use("/api/admin", adminAuthRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

process.on("uncaughtException", (err) => {
  if (err.code !== "ECONNRESET") console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});





mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ================== CONTACT ROUTE ==================
// app.post("/contact", async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.GMAIL_USER || "dbatuscholorhub@gmail.com",
//         pass: process.env.GMAIL_PASS || "bibb ijnv yluk qcpz", // replace with env var in production
//       },
//     });

//     const mailOptions = {
//       from: `"Dbatu Scholar Hub" <${process.env.GMAIL_USER || "dbatuscholorhub@gmail.com"}>`,
//       to: "dbatuscholorhub@gmail.com",
//       subject: `New message from ${name}: ${subject}`,
//       text: `
//         Name: ${name}
//         Email: ${email}
//         Message: ${message}
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ success: true, message: "Message sent successfully!" });
//   } catch (err) {
//     console.error("❌ Email Error:", err);
//     res.status(500).json({ success: false, message: "Something went wrong." });
//   }
// });

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const response = await resend.emails.send({
      from: "Dbatu Scholar Hub <no-reply@resend.dev>", // use your verified domain or @resend.dev
      to: "aryanmandhare30@gmail.com",           // your receiving email
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    console.log("✅ Email sent:", response);
    res.status(200).json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error("❌ Resend Error:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads",       // Folder name
    resource_type: file.mimetype === "application/pdf" ? "raw" : "auto", 
    allowed_formats: ["pdf", "jpg", "jpeg", "png"],
    public_id: Date.now() + "-" + file.originalname,
    access_mode: "public",   // ✅ ensures public access
  }),
});

const upload = multer({ storage });


app.post("/api/notes/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { title, subject, description, department, semester } = req.body;
    // const fileUrl = `/uploads/${req.file.filename}`;
    const fileUrl = req.file.path || req.file.secure_url; // Cloudinary gives a URL directly
    


    let newNote;
if (title === "Assignment") {
  newNote = new Assignment({
    title,
    subject,
    description,
    department,
    semester,
    fileUrl,
  });
} else {
  newNote = new Note({
    title,
    subject,
    description,
    department,
    semester,
    fileUrl,
  });
}

    await newNote.save();
    res.json({ message: "✅ Note uploaded successfully!", note: newNote });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ message: "Error uploading note", error: err.message });
  }
});



// app.get("/api/resources", async (req, res) => {
//   try {
//     const { department, semester } = req.query;
//     const query = {};
//     if (department) query.department = department;
//     if (semester) query.semester = semester;

//     const notes = await Note.find(query);
//     const assignments = await Assignment.find(query);
//     const Pyqs = await PYQ .find(query);

//     const all = [...notes, ...assignments,...Pyqs].sort(
//       (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
//     );

//     res.json(all);
//   } catch (err) {
//     console.error("❌ Fetch Resources Error:", err);
//     res.status(500).json({ error: "Failed to fetch resources" });
//   }
// });

app.get("/api/resources", async (req, res) => {
  try {
    const { department, semester } = req.query;
    const query = {};
    if (department) query.department = { $regex: new RegExp(department, "i") };
    if (semester) query.semester = semester;

    const notes = await Note.find(query);
    const assignments = await Assignment.find(query);
    const Pyqs = await PYQ.find(query);

    const all = [...notes, ...assignments, ...Pyqs].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );

    console.log("📘 Found:", all.length, "resources");
    res.json(all);
  } catch (err) {
    console.error("❌ Fetch Resources Error:", err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});




// ================== AUTH (Register + Login) ==================

// Profile photo storage
const storageProfile = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads/profiles", // ✅ Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const uploadProfile = multer({ storage: storageProfile });

// 📌 Register

app.post("/api/auth/register", uploadProfile.single("profilePhoto"), async (req, res) => {
  try {
    const { fullName, email, dob, password } = req.body;

    if (!fullName || !email || !dob || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // ✅ Upload handled by Cloudinary middleware
    // const profilePhoto = req.file ? req.file.path : null; // Cloudinary returns .path as URL
    const profilePhoto = req.file?.path || req.file?.secure_url || null;

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      fullName,
      email,
      dob,
      password: hashedPassword,
      profilePhoto,
      verified: true,
    });

    await user.save();
    return res.status(201).json({ message: "✅ Registered successfully!", user });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// 📌 Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Create JWT token (for protected routes)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePhoto: user.profilePhoto
      }
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});




// ✅ Root route (to verify Render deployment)
app.get("/", (req, res) => {
  res.send("🚀 Dbatu Scholar Hub backend is running successfully!");
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});  
