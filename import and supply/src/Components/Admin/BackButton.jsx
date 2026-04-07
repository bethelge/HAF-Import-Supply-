import React from "react";

export default function BackButton({ goBack }) {
  return (
    <button
      style={{
        marginBottom: "20px",
        padding: "8px 15px",
        backgroundColor: "#4299e1",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={goBack}
    >
      ← Back to Admin Panel
    </button>
  );
}
