import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminMediaEdit({ media, onUpdate, onCancel }) {
  const [title, setTitle] = useState(media.title);
  const [description, setDescription] = useState(media.description);
  const [mediaType, setMediaType] = useState(media.media_type);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("adminToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("media_type", mediaType);
    formData.append("media_url", media.media_url); // keep existing if not replaced

    if (file) {
      formData.append("media", file);
    }

    try {
      await axios.put(`${API_BASE_URL}/api/media/${media.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Updated successfully!");
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Failed to update media.");
    }
  };

  return (
    <div>
      <h3>Edit Media</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Media Type:
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            required
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>
        <br />
        <label>
          Replace File:
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
