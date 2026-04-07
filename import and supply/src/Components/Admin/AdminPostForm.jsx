import React, { useState } from "react";
import axios from "axios";
import BackButton from "./BackButton";
import "./admin.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminPostForm({ goBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("You must login first");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("media_type", mediaType);
    formData.append("media", file);

    try {
      await axios.post(`${API_BASE_URL}/api/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Media posted successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setMediaType("image");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to post media.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <BackButton goBack={goBack} />
      <h2>Post New Media</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      <input
        type="file"
        accept={mediaType === "image" ? "image/*" : "video/*"}
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      <button type="submit">Post</button>
    </form>
  );
}
