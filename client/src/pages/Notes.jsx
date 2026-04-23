import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import anime from "animejs";
import "./Notes.css";

const Notes = () => {
  const { department: urlDepartment } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(urlDepartment ? 2 : 1);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [allMaterials, setAllMaterials] = useState([]);
  const [dynamicSubjects, setDynamicSubjects] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const departmentMap = useMemo(() => ({
    "computer-engineering": "Computer",
    "it-engineering": "Information Technology",
    "mechanical-engineering": "Mechanical",
    "civil-engineering": "Civil Engineering",
    "electrical-engineering": "Electrical Engineering",
    "chemical-engineering": "Chemical Engineering",
  }), []);

  const departments = [
    { id: "computer-engineering", name: "Computer", icon: "fas fa-laptop-code", color: "#a855f7" },
    { id: "it-engineering", name: "Information Technology", icon: "fas fa-project-diagram", color: "#00e5ff" },
    { id: "mechanical-engineering", name: "Mechanical", icon: "fas fa-cog", color: "#fbbf24" },
    { id: "civil-engineering", name: "Civil", icon: "fas fa-building", color: "#f472b6" },
    { id: "electrical-engineering", name: "Electrical", icon: "fas fa-bolt", color: "#34d399" },
    { id: "chemical-engineering", name: "Chemical Engineering", icon: "fas fa-flask", color: "#34d399" },
  ];

  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

  // Initialize from URL if present
  useEffect(() => {
    if (urlDepartment) {
      const deptName = departmentMap[urlDepartment];
      if (deptName) {
        setSelectedDept(deptName);
        setStep(2);
      }
    }
  }, [urlDepartment, departmentMap]);

  // Animation on step change
  useEffect(() => {
    anime({
      targets: '.notes__content',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutExpo'
    });
  }, [step]);

  // Fetch subjects dynamically based on Dept and Sem
  const fetchSubjectsAndMaterials = useCallback(async (dept, sem) => {
    setLoading(true);
    try {
      const semNum = sem.split(" ")[1]; // "Semester 3" -> "3"
      const res = await axios.get("https://resource-allocator-project.onrender.com/api/resources", {
        params: { department: dept, semester: semNum }
      });

      const materials = res.data;
      setAllMaterials(materials);

      // Extract unique subjects
      const subjects = [...new Set(materials.map(m => m.subject))];
      setDynamicSubjects(subjects);

    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update step and fetch if needed
  useEffect(() => {
    if (selectedDept && selectedSemester && step === 3) {
      fetchSubjectsAndMaterials(selectedDept, selectedSemester);
    }
  }, [selectedDept, selectedSemester, step, fetchSubjectsAndMaterials]);

  // Filter notes when subject or tab changes
  useEffect(() => {
    let filtered = allMaterials;

    if (selectedSubject) {
      filtered = filtered.filter(n => n.subject === selectedSubject);
    }

    if (activeTab !== "all") {
      const typeMap = {
        "notes": ["Note", "note"],
        "pyqs": ["PYQ", "pyq"],
        "assignments": ["Assignment", "assignment"]
      };
      filtered = filtered.filter(n => {
        const type = n.title || ""; // Assuming type might be in title or checked differently
        // In the backend schema, Note, Assignment, and PYQ are different collections.
        // We'll try to guess or use the source if available.
        // For now, let's keep it simple.
        return true;
      });
    }

    setFilteredNotes(filtered);
  }, [allMaterials, selectedSubject, activeTab]);

  const handleDeptSelect = (dept) => {
    setSelectedDept(dept.name);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSemSelect = (sem) => {
    setSelectedSemester(sem);
    setStep(3);
  };

  const handleSubjectSelect = (sub) => {
    setSelectedSubject(sub);
    setStep(4);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const resetAll = () => {
    setStep(1);
    setSelectedDept("");
    setSelectedSemester("");
    setSelectedSubject("");
    setAllMaterials([]);
    setDynamicSubjects([]);
    navigate("/notes");
  };

  return (
    <div className="notes">
      <div className="notes__orb notes__orb--1"></div>
      <div className="notes__orb notes__orb--2"></div>

      <div className="container">
        {/* Progress Stepper */}
        <div className="notes__stepper">
          {[1, 2, 3, 4].map(num => (
            <div key={num} className={`notes__step ${step >= num ? 'notes__step--active' : ''}`}>
              <div className="notes__step-num">{num}</div>
              <span className="notes__step-label">
                {num === 1 ? "Dept" : num === 2 ? "Sem" : num === 3 ? "Subject" : "Result"}
              </span>
              {num < 4 && <div className="notes__step-line"></div>}
            </div>
          ))}
        </div>

        <div className="notes__content">
          {/* Step 1: Departments */}
          {step === 1 && (
            <div className="notes__selection">
              <h2 className="notes__title text-center">Select Your Department</h2>
              <div className="notes__grid">
                {departments.map(dept => (
                  <div
                    key={dept.id}
                    className="notes__card glass-card"
                    onClick={() => handleDeptSelect(dept)}
                    style={{ '--card-color': dept.color }}
                  >
                    <div className="notes__card-icon" style={{ color: dept.color }}>
                      <i className={dept.icon}></i>
                    </div>
                    <h4>{dept.name}</h4>
                    <p>Browse all semesters</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Semesters */}
          {step === 2 && (
            <div className="notes__selection">
              <div className="notes__nav">
                <button className="notes__back" onClick={handleBack}><i className="fas fa-arrow-left"></i> Back</button>
                <span className="notes__path">{selectedDept}</span>
              </div>
              <h2 className="notes__title text-center">Select Semester</h2>
              <div className="notes__sem-grid">
                {semesters.map(sem => (
                  <button
                    key={sem}
                    className={`notes__sem-btn ${selectedSemester === sem ? 'active' : ''}`}
                    onClick={() => handleSemSelect(sem)}
                  >
                    {sem}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Subjects (Dynamic) */}
          {step === 3 && (
            <div className="notes__selection">
              <div className="notes__nav">
                <button className="notes__back" onClick={handleBack}><i className="fas fa-arrow-left"></i> Back</button>
                <span className="notes__path">{selectedDept} <i className="fas fa-chevron-right"></i> {selectedSemester}</span>
              </div>
              <h2 className="notes__title text-center">Select Subject</h2>

              {loading ? (
                <div className="notes__loader">
                  <div className="spinner"></div>
                  <p>Fetching subjects...</p>
                </div>
              ) : dynamicSubjects.length > 0 ? (
                <div className="notes__sub-grid">
                  {dynamicSubjects.map(sub => (
                    <button
                      key={sub}
                      className={`notes__sub-btn ${selectedSubject === sub ? 'active' : ''}`}
                      onClick={() => handleSubjectSelect(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="notes__empty glass-card">
                  <i className="fas fa-folder-open"></i>
                  <h4>No subjects found.</h4>
                  <p>There are currently no study materials for this semester.</p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="notes__results">
              <div className="notes__header-row">
                <div className="notes__nav">
                  <button className="notes__back" onClick={handleBack}><i className="fas fa-arrow-left"></i> Back</button>
                  <button className="notes__reset" onClick={resetAll}><i className="fas fa-redo"></i> Reset</button>
                </div>
                <div className="notes__tabs">
                  {["all", "notes", "pyqs", "assignments"].map(tab => (
                    <button
                      key={tab}
                      className={`notes__tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="notes__summary glass-card">
                <h3>{selectedSubject}</h3>
                <p>{selectedDept} • {selectedSemester}</p>
              </div>

              {filteredNotes.length > 0 ? (
                <div className="notes__list">
                  {filteredNotes.map((note, idx) => (
                    <div className="notes__item glass-card" key={note._id || idx}>
                      <div className="notes__item-icon">
                        <i className={`fas ${note.fileUrl?.toLowerCase().includes('.pdf') ? 'fa-file-pdf' : 'fa-file-alt'}`}></i>
                      </div>
                      <div className="notes__item-info">
                        <h5>{note.title || note.subject}</h5>
                        <span>Uploaded At: {new Date(note.uploadedAt).toLocaleDateString()}</span>
                      </div>
                      <a href={note.fileUrl} target="_blank" rel="noreferrer" className="notes__download-btn">
                        <i className="fas fa-download"></i> View / Download
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="notes__empty glass-card">
                  <i className="fas fa-search"></i>
                  <h4>No matching materials.</h4>
                  <p>Try switching tabs or selecting another subject.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
