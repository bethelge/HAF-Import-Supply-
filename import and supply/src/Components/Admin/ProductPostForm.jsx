import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductPostForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Water Purification");
  const [customCategory, setCustomCategory] = useState("");
  const [mainImages, setMainImages] = useState([]);
  const [exploreImages, setExploreImages] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Please login first");
      return;
    }

    if (mainImages.length === 0) {
      setError("Please upload at least one main image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "category",
      category === "Other" ? customCategory : category
    );

    mainImages.forEach((file) => formData.append("mainImages", file));
    exploreImages.forEach((file) => formData.append("explore_images", file));

    try {
      await axios.post(`${API_BASE_URL}/api/product/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Product posted successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setCategory("Water Purification");
      setCustomCategory("");
      setMainImages([]);
      setExploreImages([]);
    } catch (err) {
      console.error(err);
      setError("Failed to post product.");
      setSuccess("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="admin-form"
      encType="multipart/form-data"
    >
      <h2>Post New Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Water Purification">Water Purification</option>
        <option value="Agricultural Inputs">Agricultural Inputs</option>
        <option value="Laboratory Furniture & Equipment">
          Laboratory Furniture & Equipment
        </option>
        <option value="Industrial Machinery">Industrial Machinery</option>
        <option value="Renovation Services">Renovation Services</option>
        <option value="Other">Other</option>
      </select>

      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter custom category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          required
        />
      )}

      <label>Main Product Images:</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setMainImages(Array.from(e.target.files))}
        required
      />

      <label>Explore Images (optional):</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setExploreImages(Array.from(e.target.files))}
      />

      <button type="submit">Post Product</button>

      <button
        type="button"
        onClick={() => navigate("/admin", { state: { fromForm: true } })}
      >
        Back to Admin Panel
      </button>
    </form>
  );
}
