import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// 🧩 Components
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import CustomCarousel from "./Components/Carousel/CustomCarousel";
import ServicesProducts from "./Components/Services/services";
import ProductCard from "./Components/Products/Products";
import ContactUs from "./Components/Contact/Contact";
import ImageViewer from "./Components/ImagePage/ImageViewer";
import Testimonials from "./Components/Testimony/Testimonials";
import MediaCoverage from "./Components/MediaCoverage/MediaCoverage";
import SuccessStories from "./Components/SuccessStories/SuccessStories.jsx";

// 🛡️ Admin
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminPostForm from "./Components/Admin/AdminPostForm";
import ProductPostForm from "./Components/Admin/ProductPostForm";
import AdminPanel from "./Components/Admin/AdminPanel";
import ProtectedRoute from "./Components/Admin/ProtectedRoute.jsx";
import AdminProductEdit from "./Components/Admin/AdminProductEdit.jsx";

function AppContent() {
  const location = useLocation();

  const hideNavAndFooter = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavAndFooter && <Navbar />}

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <Hero />
            </>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/service" element={<ServicesProducts />} />
        <Route path="/products" element={<ProductCard />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/image/:productSlug" element={<ImageViewer />} />
        <Route path="/media" element={<MediaCoverage />} />
        <Route path="/stories" element={<SuccessStories />} />

        <Route path="/admin/product/edit" element={<AdminProductEdit />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Panel with options */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Optional direct routes to forms */}
        <Route
          path="/admin/media"
          element={
            <ProtectedRoute>
              <AdminPostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute>
              <ProductPostForm />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideNavAndFooter && (
        <footer
          style={{
            backgroundColor: "#ffffff",
            color: "#333333",
            textAlign: "center",
            fontFamily: "'Playfair Display', serif",
            fontSize: "14px",
            padding: "0.5rem 1rem",
            borderTop: "3px solid #0A6FBF", // Royal deep purple accent
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Copyright */}
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "16px",
                color: "#0A6FBF", // Purple text for royal vibe
                fontFamily: "'Cinzel', serif",
              }}
            >
              © 2025 HAF Import & Supply
            </p>

            {/* Developer / Company info */}
            <div
              style={{
                textAlign: "right",
                lineHeight: "1.4",
                position: "relative",
                display: "inline-block",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#ab9027", // Gold accent
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  position: "relative",
                  display: "inline-block",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                Developed By{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  {/* Crown SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ab9027"
                    width="16px"
                    height="14px"
                    style={{
                      position: "absolute",
                      top: "-0.4rem",
                      left: "-0.2rem",
                      transform: "rotate(-15deg)",
                    }}
                  >
                    <path d="M5 16l-3-9 6 5 4-7 4 7 6-5-3 9H5z" />
                  </svg>
                  S
                </span>
                hebawianTech
              </p>
              <br />
              <a
                href="mailto:shebawiantech@gmail.com"
                style={{
                  color: "#0A6FBF", // Purple
                  textDecoration: "none",
                  fontSize: "12px",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                contact@shebawiantech.com
              </a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
