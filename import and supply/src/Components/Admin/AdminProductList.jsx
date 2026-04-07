import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "./BackButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminProductList({ goBack }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/product`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    navigate("/admin/product/edit", { state: { product } });
  };

  return (
    <div style={{ padding: "30px" }}>
      <BackButton goBack={goBack} />
      <h2>Admin Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border={1} cellPadding={5} cellSpacing={0}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.description}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
