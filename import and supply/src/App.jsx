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
        <footer className="site-footer">
          <div className="footer-container">
            {/* Copyright */}
            <p className="footer-copyright">
              © 2025 HAF Import & Supply
            </p>

            {/* Developer / Company info */}
            <div className="footer-developer">
              <p className="developer-text">
                Developed By{" "}
                <span className="crown-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="crown-icon"
                  >
                    <path d="M5 16l-3-9 6 5 4-7 4 7 6-5-3 9H5z" />
                  </svg>
                  S
                </span>
                hebawianTech
              </p>
              <a
                href="mailto:shebawiantech@gmail.com"
                className="developer-email"
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
