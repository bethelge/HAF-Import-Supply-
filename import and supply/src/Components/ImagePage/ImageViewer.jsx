import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ImagePage.css";
import SEO from "../SEO";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ImagePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrls = location.state?.imageUrls || [];
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (img, index) => {
    setSelectedImage(img);
    setCurrentImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImages = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (currentImageIndex + 1) % imageUrls.length;
    } else {
      newIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
    }

    setCurrentImageIndex(newIndex);
    setSelectedImage(imageUrls[newIndex]);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="image-page-container">
      <SEO
        title="Product Gallery - HAF Import & Supply Trade"
        description="Browse our product gallery showcasing agricultural equipment, industrial machines, lab furniture, and more from HAF Import & Supply Trade."
        keywords="Product Gallery, HAF Import, Ethiopia, agricultural equipment, industrial machinery, lab furniture"
        url="https://hafist.com/gallery"
        image="/og-image.jpg"
        canonical="https://hafist.com/gallery"
      />
      <div className="header-section">
        <h1 className="page-title">Product Gallery</h1>
      </div>

      <button className="back-button" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i> Back to Product
      </button>

      <div className="image-grid">
        {imageUrls.map((img, index) => (
          <div
            key={index}
            className="image-container"
            onClick={() => openLightbox(img, index)}
          >
            <img
              src={`${API_BASE_URL}${img}`}
              alt={`product-${index}`}
              className="product-image"
            />
            <div className="image-overlay">
              <div className="overlay-icon">
                <i className="fas fa-search-plus"></i>
              </div>
              <span className="overlay-text">Click to enlarge</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={`${API_BASE_URL}${selectedImage}`} alt="enlarged view" />
            <button className="close-btn" onClick={closeLightbox}>
              &times;
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {imageUrls.length}
            </div>
            {imageUrls.length > 1 && (
              <>
                <button
                  className="nav-button prev-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages("prev");
                  }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="nav-button next-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImages("next");
                  }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePage;
