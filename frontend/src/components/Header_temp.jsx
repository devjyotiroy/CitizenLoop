import { useState, useEffect } from "react";
import LoginDialog from "./LoginDialog";
import SignupDialog from "./SignupDialog";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userData");
    setIsLoggedIn(!!token);
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user.name);
    localStorage.setItem("userId", user._id);

    setIsLoggedIn(true);
    setUserData(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    // ✅ Clear everything properly
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);
    setUserData(null);
    setShowProfileMenu(false);
    setShowMobileMenu(false);

    window.location.href = "/";
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileMenu && !event.target.closest(".mobile-nav")) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <>
      <header className="header">
        <div className="header-content">
          {/* Left side - Logo and Slogan */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo">
                <span className="logo-citizen">Citizen</span>
                <span className="logo-loop">Loop</span>
                <div className="logo-badge">®</div>
              </div>
              <div className="logo-subtitle">Public Grievance Redressal System</div>
            </div>
          </div>

          {/* Desktop Navigation - Right side */}
          <nav className="desktop-nav">
            {!isLoggedIn ? (
              <div className="auth-buttons">
                <a href="/" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                  </svg>
                  Home
                </a>
                <Link to="/check-complaint-status" className="nav-link complaint-status-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                  </svg>
                  Complaint Status
                </Link>
                <a href="/policy-Citizen Loop" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,11H15V13H12V16H10V13H7V11H10V8H12V11Z" />
                  </svg>
                  Policy
                </a>
                <a href="/help-Citizen Loop" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                  </svg>
                  Help
                </a>
                <button
                  className="nav-btn login-btn"
                  onClick={() => setShowLogin(true)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                  </svg>
                  Login
                </button>
                <button
                  className="nav-btn signup-btn"
                  onClick={() => setShowSignup(true)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10A4,4 0 0,0 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
                  </svg>
                  Signup
                </button>
              </div>
            ) : (
              <div className="user-nav">
                <a href="/" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                  </svg>
                  Home
                </a>
                <a href="/complaint-form" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                  </svg>
                  Raise Complaint
                </a>
                <a href="/history" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                  </svg>
                  Your Complaints
                </a>
                <a href="/check-complaint-status" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
                  </svg>
                  Complaint Status
                </a>
                <a href="/policy-Citizen Loop" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,11H15V13H12V16H10V13H7V11H10V8H12V11Z" />
                  </svg>
                  Policy
                </a>
                <a href="/help-Citizen Loop" className="nav-link">
                  <svg className="nav-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                  </svg>
                  Help
                </a>

                <div className="profile-container">
                  <button
                    className="profile-toggle"
                    onClick={toggleProfileMenu}
                  >
                    <div className="user-avatar">
                      {userData?.name
                        ? userData.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                    <span className="user-name">
                      {userData?.name || "User"}
                    </span>
                    <svg
                      className={`dropdown-icon ${showProfileMenu ? "rotated" : ""}`}
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                    </svg>
                  </button>

                  {showProfileMenu && (
                    <div className="profile-menu">
                      <div className="profile-header">
                        <div className="profile-avatar">
                          {userData?.profilePic
                            ? <img src={userData.profilePic} alt="Profile" style={{ width: "90%", height: "90%", borderRadius: "60%" }} />
                            : <span>{userData?.name?.charAt(0).toUpperCase() || "U"}</span>}
                        </div>
                        <div className="profile-info">
                          <div className="profile-name">
                            {userData?.name || "User"}
                          </div>
                          <div className="profile-email">
                            {userData?.email || ""}
                          </div>
                        </div>
                      </div>
                      <div className="profile-menu-items">
                        <a href="/profile" className="menu-item">
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                            />
                          </svg>
                          <span>My Profile</span>
                        </a>
                        <a href="/history" className="menu-item">
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"
                            />
                          </svg>
                          <span>My Complaints</span>
                        </a>
                        <a href="/settings" className="menu-item">
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                            />
                          </svg>
                          <span>Settings</span>
                        </a>
                        <div className="menu-divider"></div>
                        <button
                          className="menu-item logout-item"
                          onClick={handleLogout}
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                              fill="currentColor"
                              d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                            />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>

          {/* Mobile menu toggle - Right side */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation Sidebar */}
        <div className={`mobile-nav ${showMobileMenu ? "active" : ""}`}>
          <div className="mobile-nav-header">
            <div className="mobile-logo-section">
              <div className="logo">
                <span className="logo-citizen">Citizen</span>
                <span className="logo-loop">Loop</span>
                <div className="logo-badge">®</div>
              </div>
            </div>
            <button className="close-menu" onClick={toggleMobileMenu}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                />
              </svg>
            </button>
          </div>

          <div className="mobile-nav-content">
            {!isLoggedIn ? (
              <div className="mobile-auth-buttons">
                <a
                  href="/"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
                    />
                  </svg>
                  <span>Home</span>
                </a>
                <Link
                  to="/check-complaint-status"
                  className="mobile-nav-link"
                  onClick={toggleMobileMenu}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"
                    />
                  </svg>
                  <span>Complaint Status</span>
                </Link>

                <button
                  className="mobile-nav-btn login-btn"
                  onClick={() => {
                    setShowLogin(true);
                    setShowMobileMenu(false);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                  </svg>
                  Login
                </button>
                <button
                  className="mobile-nav-btn signup-btn"
                  onClick={() => {
                    setShowSignup(true);
                    setShowMobileMenu(false);
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10A4,4 0 0,0 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
                  </svg>
                  Signup
                </button>
              </div>
            ) : (
              <>
                <div className="mobile-user-info">
                  <div className="mobile-user-avatar">
                    {userData?.name ? (
                      <span>{userData.name.charAt(0).toUpperCase()}</span>
                    ) : (
                      <img
                        src="https://img.icons8.com/?size=100&id=23264&format=png&color=000000"
                        alt="User Avatar"
                        style={{ width: "77%", height: "77%", borderRadius: "40%" }}
                      />
                    )}
                  </div>
                  <div className="mobile-user-details">
                    <div className="mobile-user-name">
                      {userData?.name || "User"}
                    </div>
                    <div className="mobile-user-email">
                      {userData?.email || ""}
                    </div>
                  </div>
                </div>

                <nav className="mobile-nav-menu">
                  <a
                    href="/"
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
                      />
                    </svg>
                    <span>Home</span>
                  </a>
                  <a
                    href="/profile"
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      />
                    </svg>
                    <span>Profile</span>
                  </a>

                  <a
                    href="/complaint-form"
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
                      />
                    </svg>
                    <span>Raise Complaint</span>
                  </a>

                  <a
                    href="/history"
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"
                      />
                    </svg>
                    <span>Your Complaints</span>
                  </a>

                  <a
                    href="/check-complaint-status"
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
                      />
                    </svg>
                    <span>Complaint Status</span>
                  </a>

                  <a
                    href="/policy-Citizen Loop"
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,11H15V13H12V16H10V13H7V11H10V8H12V11Z"
                      />
                    </svg>
                    <span>Policy</span>
                  </a>

                  <a
                    href="/help-Citizen Loop"
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                      />
                    </svg>
                    <span>Help</span>
                  </a>

                  <div className="menu-divider"></div>

                  <button
                    className="mobile-nav-link logout-btn"
                    onClick={handleLogout}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                      />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </nav>
              </>
            )}
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {showMobileMenu && (
          <div className="mobile-nav-overlay" onClick={toggleMobileMenu}></div>
        )}
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <LoginDialog
            onClose={() => setShowLogin(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay">
          <SignupDialog
            onClose={() => setShowSignup(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}

      <style>{`
        /* Header styling - Premium Design */
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 0;
          border-bottom: 3px solid #fbbf24;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* Enhanced Logo section - Left side */
        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .logo {
          display: flex;
          align-items: center;
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 2px;
          line-height: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .logo-citizen {
          color: white;
          font-weight: 700;
        }
        
        .logo-loop {
          color: #fbbf24;
          font-weight: 800;
          margin-left: 4px;
          position: relative;
        }
        
        .logo-loop::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #fbbf24, transparent);
          border-radius: 2px;
        }
        
        .logo-badge {
          font-size: 0.8rem;
          color: #93c5fd;
          margin-left: 4px;
          margin-top: -8px;
        }
        
        .logo-subtitle {
          font-size: 0.7rem;
          color: #bfdbfe;
          font-weight: 500;
          letter-spacing: 1px;
          margin-top: 2px;
          text-transform: uppercase;
        }
        
        .slogan {
          font-size: 0.85rem;
          color: #dbeafe;
          font-weight: 500;
          font-style: italic;
          margin-top: 2px;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          backdrop-filter: blur(10px);
        }
        
        /* Desktop Navigation - Right side */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          
          .logo {
            font-size: 1.9rem;
          }
        }
        
        .auth-buttons, .user-nav {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .nav-icon {
          margin-right: 6px;
          opacity: 0.9;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .nav-btn {
          padding: 10px 22px;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .login-btn {
          background: linear-gradient(135deg, #ffffff, #f3f4f6);
          color: #1e40af;
          border: 2px solid #ffffff;
        }
        
        .login-btn:hover {
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        
        .signup-btn {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #1e293b;
          border: 2px solid #fbbf24;
        }
        
        .signup-btn:hover {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(245, 158, 11, 0.3);
        }
        
        /* Profile container */
        .profile-container {
          position: relative;
          margin-left: 8px;
        }
        
        .profile-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          padding: 8px 16px 8px 10px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .profile-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .user-name {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
        }
        
        .dropdown-icon {
          transition: transform 0.3s ease;
        }
        
        .dropdown-icon.rotated {
          transform: rotate(180deg);
        }
        
        /* Profile menu */
        .profile-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 12px;
          width: 300px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 1000;
          animation: slideDown 0.3s ease;
          border: 1px solid #e5e7eb;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          padding: 24px;
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          color: white;
        }
        
        .profile-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 700;
          margin-right: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .profile-info {
          flex: 1;
        }
        
        .profile-name {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 4px;
        }
        
        .profile-email {
          font-size: 0.85rem;
          opacity: 0.9;
        }
        
        .profile-menu-items {
          padding: 12px 0;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 24px;
          background: none;
          border: none;
          text-align: left;
          color: #4b5563;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        
        .menu-item:hover {
          background: #f8fafc;
          color: #1e40af;
          padding-left: 28px;
        }
        
        .menu-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
          margin: 10px 24px;
        }
        
        .logout-item {
          color: #dc2626;
        }
        
        .logout-item:hover {
          background: #fef2f2;
          color: #b91c1c;
        }
        
        /* Mobile menu toggle - Right side */
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 32px;
          height: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        
        .mobile-menu-toggle span {
          height: 3px;
          width: 100%;
          background-color: white;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        @media (max-width: 1024px) {
          .mobile-menu-toggle {
            display: flex;
            order: 1;
          }
          
          .header-content {
            padding: 10px 20px;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row-reverse;
          }
          
          .logo-section {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;
          }
          
          .logo-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          
          .logo {
            font-size: 1.8rem;
            margin-bottom: 0;
          }
          
          .logo-subtitle {
            display: none;
          }
          
          .slogan {
            font-size: 0.8rem;
          }
        }
        
        /* Mobile navigation */
        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 350px;
          height: 100vh;
          background: white;
          z-index: 1001;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
        }
        
        .mobile-nav.active {
          right: 0;
        }
        
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        
        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px;
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          color: white;
          border-bottom: 3px solid #fbbf24;
        }
        
        .mobile-logo-section {
          display: flex;
          flex-direction: column;
        }
        
        .close-menu {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          padding: 8px;
          transition: all 0.3s ease;
        }
        
        .close-menu:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }
        
        .mobile-nav-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
        
        .mobile-auth-buttons {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
        
        .mobile-nav-btn {
          padding: 14px 20px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 2px solid #e5e7eb;
          margin-bottom: 20px;
        }
        
        .mobile-user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .mobile-user-details {
          flex: 1;
        }
        
        .mobile-user-name {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 6px;
          color: #1f2937;
        }
        
        .mobile-user-email {
          font-size: 0.9rem;
          color: #6b7280;
        }
        
        .mobile-nav-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          color: #4b5563;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        
        .mobile-nav-link:hover {
          background: #f8fafc;
          color: #1e40af;
          border-color: #dbeafe;
          transform: translateX(5px);
        }
        
        .logout-btn {
          color: #dc2626;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          width: 100%;
          border-radius: 10px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        
        .logout-btn:hover {
          background: #fef2f2;
          color: #b91c1c;
          border-color: #fecaca;
        }
        
        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(8px);
        }
        
        /* Modal fade-in animation */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .header-content {
            padding: 8px 12px;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row-reverse;
          }
          
          .logo-section {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;
          }
          
          .mobile-menu-toggle {
            order: 1;
            width: 28px;
            height: 22px;
          }
          
          .logo-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          
          .logo {
            font-size: 1.4rem;
            margin-bottom: 0;
          }
          
          .logo-subtitle {
            display: none;
          }
          
          .slogan {
            font-size: 0.65rem;
            padding: 1px 4px;
          }
          
          .mobile-menu-toggle {
            flex-shrink: 0;
            width: 28px;
            height: 22px;
          }
        }
      `}</style>
    </>
  );
}
