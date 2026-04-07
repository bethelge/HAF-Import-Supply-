import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "./BackButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminProductEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [mainImages, setMainImages] = useState([]);
  const [exploreImages, setExploreImages] = useState([]);

  const token = localStorage.getItem("adminToken");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    mainImages.forEach((file) => formData.append("mainImages", file));
    exploreImages.forEach((file) => formData.append("explore_images", file));

    // Send existing images if no new files
    formData.append("existingMainImages", JSON.stringify(product?.image || []));
    formData.append(
      "existingExploreImages",
      JSON.stringify(product?.explore_images || [])
    );

    try {
      await axios.put(
        `${API_BASE_URL}/api/product/${product.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product updated!");
      navigate("/admin", { state: { fromForm: true } });
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <BackButton goBack={() => navigate("/admin", { state: { fromForm: true } })} />
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <p>Current Main Images:</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {product?.image?.map((img, i) => (
            <img
              key={i}
              src={`${API_BASE_URL}${img}`}
              alt=""
              width="100"
            />
          ))}
        </div>

        <label>New Main Images (optional):</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setMainImages(Array.from(e.target.files))}
        />

        <p>Current Explore Images:</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {product?.explore_images?.map((img, i) => (
            <img
              key={i}
              src={`${API_BASE_URL}${img}`}
              alt=""
              width="100"
            />
          ))}
        </div>

        <label>New Explore Images (optional):</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setExploreImages(Array.from(e.target.files))}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
