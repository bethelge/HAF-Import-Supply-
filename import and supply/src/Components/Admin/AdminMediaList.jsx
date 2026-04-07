import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMediaEdit from "./AdminMediaEdit";
import BackButton from "./BackButton";
import styled from "styled-components";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminMediaList({ goBack }) {
  const [editing, setEditing] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/media`);
      setMediaItems(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch media.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media item?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/api/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMediaItems(mediaItems.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete media item.");
    }
  };

  return (
    <MediaListContainer>
      <BackButton goBack={goBack} />
      <h2>Manage Media</h2>

      {editing ? (
        <AdminMediaEdit
          media={editing}
          onUpdate={() => {
            setEditing(null);
            fetchMedia();
          }}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {mediaItems.length === 0 ? (
            <p>No media found.</p>
          ) : (
            <table border={1} cellPadding={5} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Media</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mediaItems.map((m) => (
                  <tr key={m.id}>
                    <td>{m.title}</td>
                    <td>{m.description}</td>
                    <td>
                      {m.media_url && m.media_url.trim() !== "" ? (
                        /\.(mp4|webm|ogg)$/i.test(m.media_url) ? (
                          <video
                            width="150"
                            controls
                            src={`${API_BASE_URL}${m.media_url}`}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={`${API_BASE_URL}${m.media_url}`}
                            alt={m.title}
                            style={{ width: "100px", height: "auto" }}
                          />
                        )
                      ) : (
                        <span style={{ color: "red" }}>No media file</span>
                      )}
                    </td>
                    <td>
                      <button onClick={() => setEditing(m)}>Edit</button>
                      <button onClick={() => handleDelete(m.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </MediaListContainer>
  );
}

const MediaListContainer = styled.div`
  background: #ffffff;
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background: #2a6f97;
    color: #fff;
  }

  tr:nth-child(even) {
    background: #f5f5f5;
  }

  button {
    margin-right: 8px;
    background: #2a6f97;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #1e567a;
    }
  }
`;
