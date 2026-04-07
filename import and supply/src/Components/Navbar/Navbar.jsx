import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";

// Theme Toggle Button Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${theme}`}>
          {theme === 'light' ? (
            <svg className="sun-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg className="moon-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

function Navbar() {
  const location = useLocation();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <>
      <nav className={`nav-main ${scrolled ? "nav-scrolled" : ""} ${theme}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="logo-wrapper">
            <Link to="/" className="logo-link" onClick={closeMobileMenu}>
              <img src={logo} alt="HAF Import & Supply Logo" className="logo-img" />
              <span className="logo-text">
                HAF Import & Supply Trade <br />
                <span className="logo-amh">ሃፍ አስመጪ እና አቅራቢ ንግድ ስራ</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-right">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Hamburger */}
            <div
              className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Nav Links */}
          <ul className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>

            {/* Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                More
                <svg 
                  className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                <li>
                  <Link
                    to="/products"
                    className={`dropdown-link ${location.pathname === "/products" ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stories"
                    className={`dropdown-link ${location.pathname === "/stories" ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/media"
                    className={`dropdown-link ${location.pathname === "/media" ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    Media Coverage
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item contact-item">
              <Link to="/contact" className="nav-contact-btn" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            
            {/* Mobile Theme Toggle */}
            <li className="nav-item mobile-theme-toggle">
              <ThemeToggle />
              <span className="mobile-theme-label">
                {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && <div className="nav-overlay open" onClick={closeMobileMenu}></div>}
    </>
  );
}

export default Navbar;
