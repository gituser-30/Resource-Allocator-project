import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname)) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/notes", label: "Study Material" },
    { to: "/about-us", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container">
        {/* Brand */}
        <NavLink className="navbar__brand" to="/home" id="navbar-brand">
          <div className="navbar__logo-ring">
            <span className="navbar__logo-text">D</span>
          </div>
          <span className="navbar__title">
            Scholar <span className="navbar__title-accent">Hub</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="navbar__links" id="navbar-links">
          {token ? (
            <>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                  <span className="navbar__link-indicator"></span>
                </NavLink>
              ))}
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar__link" id="nav-link-login">Login</NavLink>
              <NavLink to="/register" className="navbar__link" id="nav-link-register">Register</NavLink>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="navbar__actions">
          {token && (
            <button className="navbar__logout" onClick={handleLogout} id="navbar-logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            className={`navbar__toggle ${isOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            id="navbar-toggle"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`} id="navbar-mobile-menu">
        <div className="navbar__mobile-inner">
          {token ? (
            <>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <button className="navbar__mobile-logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar__mobile-link" onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="navbar__mobile-link" onClick={() => setIsOpen(false)}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
