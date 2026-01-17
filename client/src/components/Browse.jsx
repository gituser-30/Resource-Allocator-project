
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaLaptopCode, FaProjectDiagram, FaBuilding, FaBolt } from "react-icons/fa";

// const Browse = () => {
//   const navigate = useNavigate();

//   const Branches = [
//     {
//       name: "Computer Engineering",
//       icon: <FaLaptopCode size={40} />,
//       gradient: "linear-gradient(135deg, #1e3c72, #2a5298)",
//       path: "computer-engineering",
//     },
//     {
//       name: "Information Technology",
//       icon: <FaProjectDiagram size={40} />,
//       gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
//       path: "it-engineering",
//     },
//     {
//       name: "Civil Engineering",
//       icon: <FaBuilding size={40} />,
//       gradient: "linear-gradient(135deg, #e65c00, #f9d423)",
//       path: "civil-engineering",
//     },
//     {
//       name: "Electrical Engineering",
//       icon: <FaBolt size={40} />,
//       gradient: "linear-gradient(135deg, #ff512f, #dd2476)",
//       path: "electrical-engineering",
//     },
//   ];

//   const handleCardClick = (branchPath, branchName) => {
//     navigate(`/notes/${branchPath}`, { state: { department: branchName } });
//   };

//   return (
//     <div style={{ backgroundColor: "#0c2853ff", paddingBottom: "70px" }}>
//       <div className="container text-light text-center" style={{ paddingTop: 45 }}>
//         <span className="fw-bold fs-3">Browse by DBATU Scholars</span>
//         <hr
//           className="text-warning mx-auto"
//           style={{
//             width: "250px",
//             height: "3px",
//             opacity: 1,
//             marginTop: "12px",
//             marginBottom: "50px",
//           }}
//         />
//       </div>

//       <div className="container">
//         <div className="row g-4 justify-content-center">
//           {Branches.map((branch, index) => (
//             <motion.div
//               key={index}
//               className="col-lg-3 col-md-4 col-sm-6"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <motion.div
//                 className="card shadow-lg border-0 h-100 text-center text-light"
//                 style={{
//                   borderRadius: "20px",
//                   cursor: "pointer",
//                   background: branch.gradient,
//                 }}
//                 whileHover={{
//                   scale: 1.07,
//                   rotate: -2,
//                   boxShadow: "0px 10px 25px rgba(0,0,0,0.4)",
//                 }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 200, damping: 10 }}
//                 onClick={() => handleCardClick(branch.path, branch.name)}
//               >
//                 <motion.div
//                   className="card-body d-flex flex-column justify-content-center align-items-center py-4"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="mb-3">{branch.icon}</div>
//                   <h5 className="fw-bold mb-0">{branch.name}</h5>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Browse;
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLaptopCode, FaProjectDiagram, FaBuilding, FaBolt } from "react-icons/fa";
import "./Browse.css";

const Browse = () => {
  const navigate = useNavigate();

  const Branches = [
    {
      name: "Computer Engineering",
      icon: <FaLaptopCode size={40} />,
      color: "#1e3c72",
      path: "computer-engineering",
    },
    {
      name: "Information Technology",
      icon: <FaProjectDiagram size={40} />,
      color: "#11998e",
      path: "it-engineering",
    },
    {
      name: "Civil Engineering",
      icon: <FaBuilding size={40} />,
      color: "#e65c00",
      path: "civil-engineering",
    },
    {
      name: "Electrical Engineering",
      icon: <FaBolt size={40} />,
      color: "#dd2476",
      path: "electrical-engineering",
    },
  ];

  const handleCardClick = (branchPath, branchName) => {
    navigate(`/notes/${branchPath}`, { state: { department: branchName } });
  };

  return (
    <div className="browse-section">
      <div className="container text-center browse-header">
        <h2 className="browse-title">Browse Departments</h2>
        <p className="browse-sub">
          Discover notes & study materials from different branches of DBATU.
        </p>
      </div>

      <div className="container">
        <div className="row g-4 justify-content-center">
          {Branches.map((branch, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-4 col-sm-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="modern-card shadow-lg"
                style={{ borderTopColor: branch.color }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onClick={() => handleCardClick(branch.path, branch.name)}
              >
                <div
                  className="icon-wrapper"
                  style={{ color: branch.color, borderColor: branch.color }}
                >
                  {branch.icon}
                </div>

                <h5 className="branch-name">{branch.name}</h5>
                <p className="branch-desc">Click to explore resources</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;

