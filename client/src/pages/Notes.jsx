// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams, useLocation, useParams } from "react-router-dom";

// const Notes = () => {
//   const [department, setDepartment] = useState("");
//   const [semester, setSemester] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [step, setStep] = useState(1);
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   const [searchParams] = useSearchParams();
//   const searchSubject = searchParams.get("subject");
//   const location = useLocation();
//   const { department: deptParam } = useParams();

//   // ✅ Department normalization mapping
//   const departmentMap = {
//     "Computer Engineering": "Computer",
//     "Information Technology": "Information Technology",
//     "Mechanical Engineering": "Mechanical",
//     "Civil Engineering": "Civil",
//     "Electrical Engineering": "Electrical",
//     "Electronics & Telecommunication": "ENTC",
//     "Chemical Enginnering": "Chemical Engineering",
//   };

//   // ✅ Handle route /notes/:department or state from Browse page
//   useEffect(() => {
//     if (location.state?.department) {
//       setDepartment(location.state.department);
//       setStep(2);
//     } else if (deptParam) {
//       const formattedDept = deptParam
//         .replace(/-/g, " ")
//         .replace(/\b\w/g, (l) => l.toUpperCase());
//       setDepartment(formattedDept);
//       setStep(2);
//     }
//   }, [location.state, deptParam]);

//   // ✅ Fetch notes when department + semester selected
//   useEffect(() => {
//     if (department && semester) {
//       // Normalize department name to match backend
//       const backendDept = departmentMap[department] || department;

//       axios
//         .get(
//           `https://resource-allocator-project.onrender.com/api/resources?department=${encodeURIComponent(backendDept)}&semester=${semester}`
//         )
//         .then((res) => setNotes(res.data))
//         .catch((err) => console.error("❌ Fetch Error:", err));
//     }
//   }, [department, semester]);

//   const groupedNotes = notes.reduce((acc, note) => {
//     if (!acc[note.subject]) acc[note.subject] = [];
//     acc[note.subject].push(note);
//     return acc;
//   }, {});

//   // ✅ Auto-select subject if ?subject= param present
//   useEffect(() => {
//     if (searchSubject && Object.keys(groupedNotes).length > 0) {
//       const found = Object.keys(groupedNotes).find(
//         (subj) => subj.toLowerCase() === searchSubject.toLowerCase()
//       );
//       if (found) {
//         setStep(3);
//         setSelectedSubject(found);
//       }
//     }
//   }, [searchSubject, groupedNotes]);

//   return (
//     <div
//       className="container-fluid min-vh-100 py-5"
//       style={{
//         background: "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
//         color: "#f1f5f9",
//       }}
//     >
//       {/* Header */}
//       <div className="text-center mb-5">
//         <h2 className="fw-bold text-light display-5">📚 Scholars Library</h2>
//         <p className="text-muted">
//           Access department-wise and semester-wise notes, all in one place.
//         </p>
//       </div>

//       {/* Step 1: Select Department */}
//       {step === 1 && (
//         <div className="text-center">
//           <h4 className="fw-bold text-info mb-3">Select Your Department</h4>
//           <p className="text-muted">
//             Choose your department to explore available notes and resources.
//           </p>

//           <select
//             className="form-select w-50 mx-auto mt-3 bg-dark text-light border-info"
//             onChange={(e) => setDepartment(e.target.value)}
//           >
//             <option value="">-- Choose Department --</option>
//             <option value="Computer Engineering">💻 Computer Engineering</option>
//             <option value="Information Technology">
//               💻 Information Technology
//             </option>
//             <option value="Mechanical Engineering">
//               ⚙️ Mechanical Engineering
//             </option>
//             <option value="Civil Engineering">🏗️ Civil Engineering</option>
//             <option value="Electrical Engineering">
//               🔌 Electrical Engineering
//             </option>
//             <option value="Electronics & Telecommunication">
//               🔌 Electronics & Telecommunication
//             </option>
//             <option value="Chemical Engineering">
//               🔌 Chemical Engineering
//             </option>
//           </select>

//           <button
//             className="btn btn-info mt-4 px-4 fw-bold"
//             disabled={!department}
//             onClick={() => setStep(2)}
//           >
//             Next ➡️
//           </button>
//         </div>
//       )}

//       {/* Step 2: Select Semester */}
//       {step === 2 && (
//         <div className="text-center">
//           <h5 className="fw-bold text-warning">Department: {department}</h5>
//           <h6 className="mt-3 text-light">Select Your Semester</h6>
//           <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//               <button
//                 key={sem}
//                 className="btn btn-outline-light px-4 py-2 rounded-pill shadow-sm"
//                 onClick={() => {
//                   setSemester(sem);
//                   setStep(3);
//                 }}
//               >
//                 🎓 Semester {sem}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Step 3: Show Subjects */}
//       {step === 3 && !selectedSubject && (
//         <>
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h5 className="fw-bold text-info">
//               {department} - Semester {semester}
//             </h5>
//             <button
//               className="btn btn-outline-warning fw-bold"
//               onClick={() => setStep(2)}
//             >
//               🔙 Back
//             </button>
//           </div>

//           <div className="row g-4">
//             {Object.keys(groupedNotes).length > 0 ? (
//               Object.keys(groupedNotes).map((subject, index) => (
//                 <div key={index} className="col-md-3 col-sm-6">
//                   <div
//                     className="card h-100 shadow-lg border-0 text-center"
//                     style={{
//                       backgroundColor: "#1e293b",
//                       color: "#f8fafc",
//                       cursor: "pointer",
//                       transition: "transform 0.2s ease-in-out",
//                     }}
//                     onClick={() => setSelectedSubject(subject)}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.transform = "scale(1.05)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.transform = "scale(1)")
//                     }
//                   >
//                     <div className="card-body d-flex flex-column justify-content-center">
//                       <h5 className="fw-bold text-warning">📂 {subject}</h5>
//                       <p className="small text-muted">
//                         {groupedNotes[subject].length} Notes
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-muted">⚠️ No notes available yet.</p>
//             )}
//           </div>
//         </>
//       )}

//       {/* Step 4: Show Notes of Selected Subject */}
//       {step === 3 && selectedSubject && (
//         <>
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h5 className="fw-bold text-info">
//               {department} - Semester {semester} | {selectedSubject}
//             </h5>
//             <button
//               className="btn btn-outline-warning fw-bold"
//               onClick={() => setSelectedSubject(null)}
//             >
//               🔙 Back to Subjects
//             </button>
//           </div>

//           <div className="row g-4">
//             {groupedNotes[selectedSubject]?.map((note, index) => (
//               <div key={index} className="col-md-4 col-sm-6">
//                 <div
//                   className="card h-100 shadow-lg border-0"
//                   style={{
//                     backgroundColor: "#1e293b",
//                     color: "#f8fafc",
//                     transition: "all 0.3s",
//                   }}
//                 >
//                   <div className="card-body">
//                     <h5 className="fw-bold text-info">{note.title}</h5>
//                     <span className="badge bg-secondary mb-2">
//                       📖 {note.subject}
//                     </span>
//                     <p className="small">{note.description}</p>
//                   </div>
//                   <div className="card-footer bg-transparent border-0 text-center">
//                     <a
//                       href={note.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="btn btn-sm btn-outline-info fw-bold me-2"
//                     >
//                       👀 View
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Notes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Notes = () => {
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [notes, setNotes] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [searchParams] = useSearchParams();
  const searchSubject = searchParams.get("subject");

  useEffect(() => {
    if (department && semester) {
      axios
        .get(
          `https://resource-allocator-backendservice.onrender.com/api/resources?department=${department}&semester=${semester}`
        )
        .then((res) => setNotes(res.data))
        .catch((err) => console.log(err));
    }
  }, [department, semester]);

  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.subject]) acc[note.subject] = [];
    acc[note.subject].push(note);
    return acc;
  }, {});

  useEffect(() => {
    if (searchSubject && Object.keys(groupedNotes).length > 0) {
      const found = Object.keys(groupedNotes).find(
        (subj) => subj.toLowerCase() === searchSubject.toLowerCase()
      );
      if (found) {
        setStep(3);
        setSelectedSubject(found);
      }
    }
  }, [searchSubject, groupedNotes]);

return (
  <div
    className="container-fluid min-vh-100 py-5"
    style={{
      background: "linear-gradient(135deg, #0a0f1f, #0e1b2c, #0a1a33)",
      color: "#e6f1ff",
      paddingBottom: "90px",
    }}
  >
    {/* Header */}
    <div className="text-center mb-5">
      <h2 className="fw-bold display-5" style={{ color: "#a8c5ff" }}>
        📚 Scholar’s Library
      </h2>
      <p className="text-light opacity-75">
        Find all semester-wise notes, books, assignments & resources.
      </p>
    </div>

    {/* Step 1: Select Department */}
    {step === 1 && (
      <div className="text-center">
        <h4 className="fw-bold mb-3" style={{ color: "#84d8ff" }}>
          Select Your Department
        </h4>

        <select
          className="form-select w-50 mx-auto mt-3 border-0 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "12px",
            padding: "12px",
            backdropFilter: "blur(10px)",
          }}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">-- Choose Department --</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Electronics & Telecommunication">
            Electronics & Telecommunication
          </option>
          <option value="Chemical Engineering">Chemical Engineering</option>
        </select>

        <button
          className="btn mt-4 px-4 fw-bold"
          style={{
            background: "#4ea8de",
            borderRadius: "10px",
            padding: "10px 26px",
            color: "white",
          }}
          disabled={!department}
          onClick={() => setStep(2)}
        >
          Continue →
        </button>
      </div>
    )}

    {/* Step 2: Select Semester */}
    {step === 2 && (
      <div className="text-center">
        <h5 className="fw-bold" style={{ color: "#ffd166" }}>
          Department: {department}
        </h5>
        <p className="text-light opacity-75">Select your semester below</p>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              className="shadow-lg"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "#caf0f8",
                border: "none",
                borderRadius: "12px",
                padding: "12px 30px",
                fontWeight: "600",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
              onClick={() => {
                setSemester(sem);
                setStep(3);
              }}
            >
              Semester {sem}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Step 3: Show Subjects */}
    {step === 3 && !selectedSubject && (
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold" style={{ color: "#90e0ef" }}>
            {department} – Sem {semester}
          </h5>

          <button
            className="btn btn-outline-light"
            onClick={() => setStep(2)}
            style={{ borderRadius: "8px" }}
          >
            ← Back
          </button>
        </div>

        <div className="row g-4">
          {Object.keys(groupedNotes).length > 0 ? (
            Object.keys(groupedNotes).map((subject, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div
                  className="shadow-lg text-center"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: "15px",
                    padding: "25px 10px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => setSelectedSubject(subject)}
                >
                  <h5 className="fw-bold" style={{ color: "#ffd166" }}>
                    {subject}
                  </h5>
                  <p className="small opacity-75">
                    {groupedNotes[subject].length} Files Available
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No subjects available.</p>
          )}
        </div>
      </>
    )}

    {/* Step 4: Show Notes */}
    {step === 3 && selectedSubject && (
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold" style={{ color: "#90e0ef" }}>
            {selectedSubject}
          </h5>
          <button
            className="btn btn-outline-light"
            onClick={() => setSelectedSubject(null)}
            style={{ borderRadius: "8px" }}
          >
            ← Back
          </button>
        </div>

        <div className="row g-4">
          {groupedNotes[selectedSubject]?.map((note, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div
                className="shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "15px",
                  padding: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h5 className="fw-bold" style={{ color: "#a8dadc" }}>
                  {note.title}
                </h5>
                <span className="badge bg-dark mb-2">{note.subject}</span>
                <p className="small opacity-75">{note.description}</p>

                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info w-100 fw-bold mt-3"
                  style={{
                    background: "#4ea8de",
                    borderRadius: "10px",
                  }}
                >
                  View File
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

};

export default Notes;

