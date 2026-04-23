// // server.js
// const express = require("express");
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
// const { Resend } = require("resend");


// require("dotenv").config();

// const { v2: cloudinary } = require("cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ====== MODELS ======
// const Note = require("./models/Note");
// const User = require("./models/User");
// const Assignment = require("./models/Assignment")
// const PYQ = require("./models/PYQ");


// const app = express();





// // Middleware
// app.use(express.json());
// app.use(cors()); // allow all origins while developing
// app.use("/images", express.static(path.join(__dirname, "images")));

// const userRoutes = require("./routes/user");
// app.use("/api/users", userRoutes);
// const adminAuthRoutes = require("./routes/adminAuth");
// app.use("/api/admin", adminAuthRoutes);
// const adminRoutes = require("./routes/admin");
// app.use("/api/admin", adminRoutes);

// process.on("uncaughtException", (err) => {
//   if (err.code !== "ECONNRESET") console.error("Uncaught Exception:", err);
// });

// process.on("unhandledRejection", (reason) => {
//   console.error("Unhandled Rejection:", reason);
// });





// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // ================== CONTACT ROUTE ==================
// // app.post("/contact", async (req, res) => {
// //   const { name, email, subject, message } = req.body;

// //   try {
// //     const transporter = nodemailer.createTransport({
// //       host: "smtp.gmail.com",
// //       port: 465,
// //       secure: true,
// //       auth: {
// //         user: process.env.GMAIL_USER || "dbatuscholorhub@gmail.com",
// //         pass: process.env.GMAIL_PASS || "bibb ijnv yluk qcpz", // replace with env var in production
// //       },
// //     });

// //     const mailOptions = {
// //       from: `"Dbatu Scholar Hub" <${process.env.GMAIL_USER || "dbatuscholorhub@gmail.com"}>`,
// //       to: "dbatuscholorhub@gmail.com",
// //       subject: `New message from ${name}: ${subject}`,
// //       text: `
// //         Name: ${name}
// //         Email: ${email}
// //         Message: ${message}
// //       `,
// //     };

// //     await transporter.sendMail(mailOptions);
// //     res.json({ success: true, message: "Message sent successfully!" });
// //   } catch (err) {
// //     console.error("❌ Email Error:", err);
// //     res.status(500).json({ success: false, message: "Something went wrong." });
// //   }
// // });

// const resend = new Resend(process.env.RESEND_API_KEY);

// app.post("/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const response = await resend.emails.send({
//       from: "Dbatu Scholar Hub <no-reply@resend.dev>", // use your verified domain or @resend.dev
//       to: "aryanmandhare30@gmail.com",           // your receiving email
//       subject: `New Contact from ${name}`,
//       html: `
//         <h2>New Contact Message</h2>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//     });

//     console.log("✅ Email sent:", response);
//     res.status(200).json({ success: true, message: "Email sent successfully!" });

//   } catch (error) {
//     console.error("❌ Resend Error:", error);
//     res.status(500).json({ error: "Failed to send email", details: error.message });
//   }
// });


// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "uploads",       // Folder name
//     resource_type: file.mimetype === "application/pdf" ? "raw" : "auto", 
//     allowed_formats: ["pdf", "jpg", "jpeg", "png"],
//     public_id: Date.now() + "-" + file.originalname,
//     access_mode: "public",   // ✅ ensures public access
//   }),
// });

// const upload = multer({ storage });


// app.post("/api/notes/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const { title, subject, description, department, semester } = req.body;
//     // const fileUrl = `/uploads/${req.file.filename}`;
//     const fileUrl = req.file.path || req.file.secure_url; // Cloudinary gives a URL directly



//     let newNote;
// if (title === "Assignment") {
//   newNote = new Assignment({
//     title,
//     subject,
//     description,
//     department,
//     semester,
//     fileUrl,
//   });
// } else {
//   newNote = new Note({
//     title,
//     subject,
//     description,
//     department,
//     semester,
//     fileUrl,
//   });
// }

//     await newNote.save();
//     res.json({ message: "✅ Note uploaded successfully!", note: newNote });
//   } catch (err) {
//     console.error("❌ Upload Error:", err);
//     res.status(500).json({ message: "Error uploading note", error: err.message });
//   }
// });



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





// // ================== AUTH (Register + Login) ==================

// // Profile photo storage
// const storageProfile = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "uploads/profiles", // ✅ Folder in Cloudinary
//     allowed_formats: ["jpg", "jpeg", "png"],
//     public_id: (req, file) => `${Date.now()}-${file.originalname}`,
//   },
// });

// const uploadProfile = multer({ storage: storageProfile });

// // 📌 Register

// app.post("/api/auth/register", uploadProfile.single("profilePhoto"), async (req, res) => {
//   try {
//     const { fullName, email, dob, password } = req.body;

//     if (!fullName || !email || !dob || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     // ✅ Upload handled by Cloudinary middleware
//     // const profilePhoto = req.file ? req.file.path : null; // Cloudinary returns .path as URL
//     const profilePhoto = req.file?.path || req.file?.secure_url || null;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = new User({
//       fullName,
//       email,
//       dob,
//       password: hashedPassword,
//       profilePhoto,
//       verified: true,
//     });

//     await user.save();
//     return res.status(201).json({ message: "✅ Registered successfully!", user });
//   } catch (err) {
//     console.error("❌ Register Error:", err);
//     res.status(500).json({ message: "Error registering user" });
//   }
// });

// // 📌 Login
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // ✅ Create JWT token (for protected routes)
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || "supersecretkey",
//       { expiresIn: "1h" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         profilePhoto: user.profilePhoto
//       }
//     });
//   } catch (err) {
//     console.error("❌ Login Error:", err);
//     res.status(500).json({ message: "Error logging in" });
//   }
// });




// // ✅ Root route (to verify Render deployment)
// app.get("/", (req, res) => {
//   res.send("🚀 Dbatu Scholar Hub backend is running successfully!");
// });

// // ================== START SERVER ==================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });  



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
app.use(cors());
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
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dbatu_scholar_hub")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ================== RESEND CLIENT ==================
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

if (!resend) {
  console.warn("⚠️ Warning: RESEND_API_KEY is missing. Email notifications will be disabled.");
}

// ================== SEND EMAIL TO ALL STUDENTS ==================
async function sendEmailToAllStudents(title, department, semester) {
  if (!resend) return; // Skip if resend is not configured

  try {
    // Use .lean() to reduce memory usage significantly
    const students = await User.find({}, "email fullName").lean();

    // Chunk emails to prevent hitting rate limits
    const CHUNK_SIZE = 50; 
    for (let i = 0; i < students.length; i += CHUNK_SIZE) {
      const chunk = students.slice(i, i + CHUNK_SIZE);
      const emails = chunk.map((student) =>
        resend.emails.send({
          from: "Dbatu Scholar Hub <no-reply@resend.dev>",
          to: student.email,
          subject: `New ${title} Uploaded`,
          html: `
          <h3>Hello ${student.fullName},</h3>
          <p>A new <strong>${title}</strong> has been uploaded in:</p>
          <ul>
            <li><b>Department:</b> ${department}</li>
            <li><b>Semester:</b> ${semester}</li>
          </ul>
          <p>Please login to Dbatu Scholar Hub to download it.</p>
          <br/>
          <p>Regards,<br>Dbatu Scholar Hub Team</p>
        `,
        })
      );

      const results = await Promise.allSettled(emails);
      console.log(`Email dispatch results for chunk ${i / CHUNK_SIZE + 1}:`, results);

      // Wait a bit between chunks to respect rate limits (e.g., 1 second)
      if (i + CHUNK_SIZE < students.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error("❌ Error sending notification emails:", error);
  }
}


// ================== CONTACT ROUTE ==================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const response = await resend.emails.send({
      from: "Dbatu Scholar Hub <no-reply@resend.dev>",
      to: "aryanmandhare30@gmail.com",
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

// ================== FILE UPLOAD CONFIG ==================
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "uploads",
    resource_type: file.mimetype === "application/pdf" ? "raw" : "auto",
    allowed_formats: ["pdf", "jpg", "jpeg", "png"],
    public_id: Date.now() + "-" + file.originalname,
    access_mode: "public",
  }),
});

const upload = multer({ storage });

// ================== NOTE / ASSIGNMENT UPLOAD ==================
app.post("/api/notes/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { title, subject, description, department, semester } = req.body;
    const fileUrl = req.file.path || req.file.secure_url;

    let newNote;

    if (title === "Assignment") {
      newNote = new Assignment({
        title, subject, description, department, semester, fileUrl,
      });
    } else {
      newNote = new Note({
        title, subject, description, department, semester, fileUrl,
      });
    }

    await newNote.save();

    // 📢 Send email notifications to all students
    await sendEmailToAllStudents(title, department, semester);

    res.json({ message: "✅ Uploaded & Emails Sent!", note: newNote });

  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ message: "Error uploading note", error: err.message });
  }
});

// ================== RESOURCES FETCH ==================
app.get("/api/resources", async (req, res) => {
  try {
    const { department, semester } = req.query;

    const query = {};
    if (department) query.department = department;
    if (semester) query.semester = semester;

    // Use Promise.all to fetch concurrently and .lean() for better space/time complexity
    const [notes, assignments, pyqs] = await Promise.all([
      Note.find(query).lean(),
      Assignment.find(query).lean(),
      PYQ.find(query).lean(),
    ]);

    const all = [...notes, ...assignments, ...pyqs].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );

    res.json(all);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

// ================== REGISTER ==================
const storageProfile = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads/profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const uploadProfile = multer({ storage: storageProfile });

app.post("/api/auth/register", uploadProfile.single("profilePhoto"), async (req, res) => {
  try {
    const { fullName, email, dob, password } = req.body;

    if (!fullName || !email || !dob || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

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
    return res.status(201).json({ message: "Registered successfully!", user });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// ================== FORGOT PASSWORD (RESET) ==================
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email, dob, newPassword } = req.body;

    if (!email || !dob || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fix: Validate dates to avoid crash when dob is invalid or missing
    if (!user.dob || isNaN(new Date(user.dob).getTime()) || isNaN(new Date(dob).getTime())) {
      return res.status(400).json({ message: "Verification failed. Invalid Date of Birth." });
    }

    // Convert stored dob and provided dob to same format for comparison
    const storedDob = new Date(user.dob).toISOString().split('T')[0];
    const providedDob = new Date(dob).toISOString().split('T')[0];

    if (storedDob !== providedDob) {
      return res.status(400).json({ message: "Verification failed. Incorrect Date of Birth." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successful! You can now login." });
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);
    res.status(500).json({ message: "Error resetting password" });
  }
});

// ================== LOGIN ==================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

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
        dob: user.dob,
        department: user.department,
        profilePhoto: user.profilePhoto
      }
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Dbatu Scholar Hub backend is running successfully!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
