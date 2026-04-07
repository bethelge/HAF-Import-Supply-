import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [mainImages, setMainImages] = useState([]);
  const [exploreImages, setExploreImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("You must be logged in as admin.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    mainImages.forEach((file) => formData.append("mainImages", file));
    exploreImages.forEach((file) => formData.append("exploreImages", file));

    try {
      await axios.post(
        `${API_BASE_URL}/api/products/uploadProductWithFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product uploaded successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setMainImages([]);
      setExploreImages([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />

      <label>Main Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        name="mainImages"
        onChange={(e) => setMainImages([...e.target.files])}
        required
      />

      <label>Explore Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setExploreImages(Array.from(e.target.files))}
      />

      <button type="submit">Upload Product</button>
    </form>
  );
}

export default AdminProductForm;
