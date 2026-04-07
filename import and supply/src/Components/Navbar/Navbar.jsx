import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";

function Navbar() {
  const location = useLocation();
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

  return (
    <>
      <nav className={`nav-main ${scrolled ? "nav-scrolled" : ""}`}>
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
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && <div className="nav-overlay" onClick={closeMobileMenu}></div>}
    </>
  );
}

export default Navbar;
