import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./media.css";
import axios from "axios";
import SEO from "../SEO";

export default function MediaCoverage() {
  const navigate = useNavigate();
  const [mediaItems, setMediaItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  // ✅ Use environment variable
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        console.log("API Base URL:", API_BASE_URL); // Debug check
        const res = await axios.get(`${API_BASE_URL}/api/media`);
        setMediaItems(res.data);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      }
    };

    fetchMedia();
  }, [API_BASE_URL]);

  return (
    <div className="media-page">
      <SEO
        title="Media Coverage - HAF Import & Supply Trade"
        description="Explore HAF Import & Supply Trade’s media coverage including interviews, news features, and industry highlights across Ethiopia."
        keywords="HAF media coverage, Ethiopia trade news, HAF interviews, HAF in the news"
        url="https://hafist.com/media-coverage"
        image="/og-image.jpg"
        canonical="https://hafist.com/media-coverage"
      />
      <div className="media-header">
        <h1
          className="glitch-layers"
          data-text="VOICES OF TRUST"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "0 auto",
            width: "100%",
          }}
        >
          MEDIA COVERAGE
        </h1>
        <p className="subtitle">Featured appearances and interviews</p>
        <div className="header-accent"></div>
      </div>

      {/* Uploaded Media from Backend */}
      <div className="video-gallery">
        {mediaItems.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="video-card"
            style={{ "--i": index }} // animation stagger
          >
            <div className="video-wrapper">
              {item.media_type === "video" ? (
                <video controls>
                  <source
                    src={`${API_BASE_URL}${item.media_url}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={`${API_BASE_URL}${item.media_url}`}
                  alt={item.title}
                  className="uploaded-image"
                />
              )}
            </div>
            <div className="video-info">
              <h2>{item.title}</h2>
              <p className="video-description">{item.description}</p>
              <p className="video-date">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < mediaItems.length && (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
