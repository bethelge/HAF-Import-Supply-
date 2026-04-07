import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPostForm from "./AdminPostForm";
import ProductPostForm from "./ProductPostForm";
import AdminProductList from "./AdminProductList";
import AdminMediaList from "./AdminMediaList";
import styled from "styled-components";

export default function AdminPanel() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formType, setFormType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);

    if (location.state?.fromForm) {
      setFormType(null);
    }
  }, [location.state]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleChooseForm = (type) => {
    setFormType(type);
  };

  return (
    <AdminContainer>
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : formType === "media" ? (
        <AdminPostForm goBack={() => setFormType(null)} />
      ) : formType === "product" ? (
        <ProductPostForm goBack={() => setFormType(null)} />
      ) : formType === "list" ? (
        <AdminProductList goBack={() => setFormType(null)} />
      ) : formType === "mediaList" ? (
        <AdminMediaList goBack={() => setFormType(null)} />
      ) : (
        <AdminDashboard>
          <h2>Welcome, Admin 👋</h2>
          <p>What would you like to do?</p>
          <ButtonGroup>
            <ActionButton onClick={() => handleChooseForm("media")}>
              📸 Post Media
            </ActionButton>
            <ActionButton onClick={() => handleChooseForm("product")}>
              📦 Post Product
            </ActionButton>
            <ActionButton onClick={() => handleChooseForm("list")}>
              📝 Manage Products
            </ActionButton>
            <ActionButton onClick={() => handleChooseForm("mediaList")}>
              🗂 Manage Media
            </ActionButton>
          </ButtonGroup>
        </AdminDashboard>
      )}
    </AdminContainer>
  );
}

const AdminContainer = styled.div`
  min-height: 100vh;
  background: #f7f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminDashboard = styled.div`
  text-align: center;
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 30px;
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const ActionButton = styled.button`
  background: #2a6f97;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #1e567a;
    transform: translateY(-2px);
  }
`;
