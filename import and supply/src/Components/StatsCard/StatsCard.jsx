import React from "react";
import "./StatsCard.css";

export default function StatsCard({ position, years, clients, products }) {
  // position: "top" or "bottom"
  return (
    <div className={`split-stats-card ${position}`}>
      <div className="stats-content">
        <div className="stat-item">
          <div className="stat-number">{years}+</div>
          <div className="stat-label">Years in Business</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{clients}+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{products}+</div>
          <div className="stat-label">Products</div>
        </div>
      </div>
      {/* Decorative connector */}
      {position === "top" && <div className="vertical-connector"></div>}
      {position === "bottom" && <div className="vertical-connector bottom"></div>}
    </div>
  );
} 