import { NavLink, useNavigate, useLocation } from "react-router-dom";
import head from "../image/Head_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <NavLink
          className="navbar-brand d-flex align-items-center fw-bold text-light"
          to="/"
        >
          <img
            src={head}
            alt="Dbatu Scholar Hub Logo"
            className="me-2"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ color: "#38bdf8" }}>Dbatu Scholar Hub</span>
        </NavLink>

        {/* Toggle button */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 text-center">
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-warning border-bottom border-2 border-warning px-3"
                        : "nav-link text-light px-3"
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-warning border-bottom border-2 border-warning px-3"
                        : "nav-link text-light px-3"
                    }
                    to="/Notes"
                  >
                    Study Material
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-warning border-bottom border-2 border-warning px-3"
                        : "nav-link text-light px-3"
                    }
                    to="/About-us"
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-warning border-bottom border-2 border-warning px-3"
                        : "nav-link text-light px-3"
                    }
                    to="/Contact"
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-warning border-bottom border-2 border-warning px-3"
                        : "nav-link text-light px-3"
                    }
                    to="/Profile"
                  >
                    Profile
                  </NavLink>
                </li>
                
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-warning border-bottom border-2 border-warning px-3"
                        : "nav-link text-light px-3"
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-warning border-bottom border-2 border-warning px-3"
                        : "nav-link text-light px-3"
                    }
                    to="/Register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Logout button (moves below links in mobile view) */}
          {token && (
            <div className="text-center mt-2 mt-lg-0">
              <button
                className="btn btn-danger px-4 fw-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
