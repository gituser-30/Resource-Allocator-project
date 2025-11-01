import React from "react";
import { NavLink } from "react-router-dom";
const Popular = () => {
  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #0f2027, #000304ff, #010709ff)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ---------------- Featured Notes ---------------- */}
      <h2 className="text-center fw-bold mb-4" style={{ color: "#90e0ef" }}>
  🌟 Featured Notes
</h2>

<div className="row g-4 justify-content-center">
  {[
    {
      id: 1,
      subject: "Discrete mathematics",
      unit: "Reference book",
      img: "https://essaycorp.com/blog/uploads/Side-Hustle.webp",
      description: "📖 Second Year - Discrete mathematics",
      link:"https://res.cloudinary.com/dsq3sf0ea/raw/upload/v1761630004/uploads/1761630003169-1757868895020-%5BBook%5D%20Discrete%20mathematics%20and%20its%20applications%20%282019%29_0_compressed.pdf",
    },
    {
      id: 2,
      subject: "C Programming",
      unit: "Reference Book",
      img: "https://www.seedinfotech.com/wp-content/uploads/2023/01/C_Programming-1-1170x728.jpg",
      description: "🖥️ First Year - C Programming",
      link:"https://res.cloudinary.com/dsq3sf0ea/raw/upload/v1761630484/uploads/1761630483368-1757868844647-C%20programming%20Notes.pdf",
    },
    {
      id: 3,
      subject: "Data Structures & Algorithm",
      unit: "Unit 3",
      img: "https://i.ytimg.com/vi/F0PYgGImt1A/maxresdefault.jpg",
      description: "🌐 Second Year - Data Structures & Algorithm",
      link:"https://res.cloudinary.com/dsq3sf0ea/raw/upload/v1761594778/uploads/1761594777216-1757867439691-DSA%20UNIT%201_compressed%20%281%29.pdf",
    },
  ].map((note) => (
    <div className="col-md-4 col-sm-6" key={note.id}>
      <div
        className="card shadow border-0 h-100"
        style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: "14px",
          backdropFilter: "blur(12px)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.2)";
        }}
      >
        <div className="card-body text-center">
          <img
            src={note.img}
            alt={`${note.subject} Notes`}
            className="img-fluid rounded mb-3"
            style={{
              maxHeight: "180px",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
            }}
          />
          <h5 className="card-title fw-bold text-info">
            {note.subject} - {note.unit} Notes
          </h5>
          <p className="card-text small text-light"><a href={note.link} target="_blank" rel="noopener noreferrer">{note.description}</a></p>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* ---------------- Featured Assignments ---------------- */}
      <h2
        className="text-center fw-bold mt-5 mb-4"
        style={{ color: "#90ee90" }}
      >
        📝 Featured Assignments
      </h2>

      <div className="row g-4 justify-content-center">
        {[1, 2, 3].map((assign) => (
          <div className="col-md-4 col-sm-6" key={assign}>
            <div
              className="card shadow border-0 h-100"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "14px",
                backdropFilter: "blur(12px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.2)";
              }}
            >
              <div className="card-body text-center">
                <img
                  src={`https://cdn-icons-png.flaticon.com/512/3135/31357${
                    10 + assign
                  }.png`}
                  alt="Assignment"
                  className="img-fluid rounded mb-3"
                  style={{
                    maxHeight: "150px",
                    borderRadius: "10px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
                  }}
                />
                <h5 className="card-title fw-bold text-success">
                  DSA Notes {assign}
                </h5>
                <p className="card-text small text-light">
                  📝 Second Year - Data Structure & Algorithm
                </p>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Video Tutorials ---------------- */}
      <h2
        className="text-center fw-bold mt-5 mb-4"
        style={{ color: "#ff6b6b" }}
      >
        🎥 Video Tutorials
      </h2>
      <div className="row g-4 justify-content-center">
        {[
          "https://www.youtube.com/embed/videoseries?si=ntB57z6TnMFAXMfC&amp;list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop",
          "https://www.youtube.com/embed/tVzUXW6siu0?si=6tpffHiXeG-kfbmV",
          "https://www.youtube.com/embed/videoseries?si=bmD1NzfMB7gMhcT5&amp;list=PLjwm_8O3suyOFd8LTFqgw9v7MqPNtgINA",
          "https://www.youtube.com/embed/LvC68w9JS4Y?si=j2_HAX1Aad0UCPQT",
          "https://www.youtube.com/embed/videoseries?si=mgNT8Cg8HWUPRijH&amp;list=PLC36xJgs4dxEYmhzVBW7nBdftFZ4xmiF1",
        ].map((vid) => (
          <div className="col-md-4 col-sm-6" key={vid}>
            <div className="ratio ratio-16x9 shadow rounded overflow-hidden">
              <iframe src={vid} title="YouTube video" allowFullScreen></iframe>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Popular;
