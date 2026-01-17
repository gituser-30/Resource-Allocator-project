// import React from "react";
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from "react-router-dom";

// const Footer = () => {
//   const navigate = useNavigate();
//   return (
//     <footer
//       className="text-light pt-5 pb-3"
//       style={{ backgroundColor: "#0d1117" }}
//     >
//       <div className="container">
//         <div className="row text-center text-md-start">
//           {/* About Section */}
//           <div className="col-md-4 mb-4">
//             <h4 className="fw-bold text-warning mb-3">Dbatu Scholar Hub</h4>
//             <p style={{ fontSize: "15px", lineHeight: "1.8" }}>
//               A one-stop platform for DBATU students to access{" "}
//               <span className="text-warning fw-semibold">study materials</span>,{" "}
//               <span className="text-warning fw-semibold">notes</span>,{" "}
//               <span className="text-warning fw-semibold">assignments</span>, and{" "}
//               <span className="text-warning fw-semibold">previous year papers</span>. 
//               <br />
//               Learn 📖 | Share 🤝 | Grow 🚀
//             </p>
//           </div>

//           {/* Quick Links */}
//           {/* <div className="col-md-4 mb-4">
//             <h4 className="fw-bold text-warning mb-3">Quick Links</h4>
//             <ul className="list-unstyled">
//               {[
//                 { name: "🏠 Home", link: "/home" },
//                 { name: "📚 Browse Notes", link: "/Notes" },
//                 { name: "ℹ️ About Us", link: "/About-us" },
//                 { name: "✉️ Contact", link: "/Contact" },
//               ].map((item, idx) => (
//                 <li key={idx} className="mb-2">
//                   <a
//                     href={item.link}
//                     className="text-decoration-none text-light"
//                     style={{ transition: "color 0.3s" }}
//                     onMouseEnter={(e) => (e.target.style.color = "#facc15")}
//                     onMouseLeave={(e) => (e.target.style.color = "white")}
//                   >
//                     {item.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//             <div className="col-md-4 mb-4">
//             <h4 className="fw-bold text-warning mb-3">Quick Links</h4>
//             <ul className="list-unstyled">
//               {[
//                 { name: "🏠 Home", link: "/home" },
//                 { name: "📚 Browse Notes", link: "/Notes" },
//                 { name: "ℹ️ About Us", link: "/About-us" },
//                 { name: "✉️ Contact", link: "/Contact" },
//               ].map((item, idx) => (
//                 <li key={idx} className="mb-2">
//                   <span
//                     role="button"
//                     className="text-decoration-none text-light"
//                     style={{ cursor: "pointer", transition: "color 0.3s" }}
//                     onClick={() => navigate(item.link)}
//                     onMouseEnter={(e) => (e.target.style.color = "#facc15")}
//                     onMouseLeave={(e) => (e.target.style.color = "white")}
//                   >
//                     {item.name}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact / Social Media */}
//           <div className="col-md-4 mb-4">
//             <h4 className="fw-bold text-warning mb-3">Connect with Us</h4>
//             <p style={{ fontSize: "15px" }}>
//               📧 dbatuscholarhub@gmail.com
//             </p>
//             <div className="d-flex justify-content-center justify-content-md-start gap-3">
//               <a
//                 href="https://www.linkedin.com/in/rashid-khopatkar-74a238308/"
//                 className="text-light"
//                 style={{
//                   fontSize: "20px",
//                   transition: "color 0.3s, transform 0.3s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = "#0a66c2";
//                   e.target.style.transform = "scale(1.2)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = "white";
//                   e.target.style.transform = "scale(1)";
//                 }}
//               >
//                 <FaLinkedinIn />
//               </a>
//               <a
//                 href="https://instagram.com/mandhare3243"
//                 className="text-light"
//                 style={{
//                   fontSize: "20px",
//                   transition: "color 0.3s, transform 0.3s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = "#e4405f";
//                   e.target.style.transform = "scale(1.2)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = "white";
//                   e.target.style.transform = "scale(1)";
//                 }}
//               >
//                 <FaInstagram />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <hr className="bg-secondary" />

//         {/* Copyright */}
//         <div className="text-center">
//           <p className="mb-0" style={{ fontSize: "14px" }}>
//             &copy; {new Date().getFullYear()}{" "}
//             <span className="text-warning fw-semibold">Dbatu Scholar Hub</span> | 
//             All Rights Reserved
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-section">
      <div className="container">

        <div className="row text-center text-md-start">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-title">Dbatu Scholar Hub</h4>
            <p className="footer-text">
              A one-stop platform for DBATU students to access  
              <span className="highlight"> study materials</span>,  
              <span className="highlight"> notes</span>,  
              <span className="highlight"> assignments</span>, and  
              <span className="highlight"> PYQs</span>.
              <br />  
              Learn 📖 | Share 🤝 | Grow 🚀
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {[
                { name: "🏠 Home", link: "/home" },
                { name: "📚 Browse Notes", link: "/Notes" },
                { name: "ℹ️ About Us", link: "/About-us" },
                { name: "✉️ Contact", link: "/Contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <span
                    role="button"
                    className="footer-link"
                    onClick={() => navigate(item.link)}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-title">Connect with Us</h4>
            <p className="footer-email">📧 dbatuscholarhub@gmail.com</p>

            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/rashid-khopatkar-74a238308/" target="_blank">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com/mandhare3243" target="_blank">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom */}
        <p className="footer-bottom">
          © {new Date().getFullYear()} <span className="highlight">Dbatu Scholar Hub</span> | All Rights Reserved
        </p>

      </div>
    </footer>
  );
};

export default Footer;
