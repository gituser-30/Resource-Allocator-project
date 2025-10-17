const mongoose = require("mongoose");
const Note = require("./models/Note");

mongoose.connect("mongodb://localhost:27017/Dbatu_scholar_hub", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedNotes = [
  {
    title: "Data Structures Notes",
    subject: "DSA",
    department: "Computer",
    semester: "3",
    description: "Complete DSA PDF",
    fileUrl: "https://example.com/dsa.pdf"
  },
  {
    title: "Digital Logic Notes",
    subject: "DL",
    department: "Computer",
    semester: "3",
    description: "All chapters included",
    fileUrl: "uploads\dbms_unit1.pdf"
  }
];

Note.insertMany(seedNotes)
  .then(() => {
    console.log("Sample notes inserted ✅");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
