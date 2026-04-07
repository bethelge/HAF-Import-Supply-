import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Request interceptor: add token to headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token && !config.url.endsWith("/admin/login")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 Unauthorized errors and try to refresh token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401, not a retry, and not the login or refresh endpoint itself
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.endsWith("/admin/refresh") &&
      !originalRequest.url.endsWith("/admin/login")
    ) {
      originalRequest._retry = true;

      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");

        // Try to refresh the token using the existing expired token
        const res = await axios.post(
          `${API_BASE_URL}/api/admin/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data && res.data.token) {
          // Save the new token
          localStorage.setItem("adminToken", res.data.token);

          // Update the original request's Authorization header
          originalRequest.headers["Authorization"] = `Bearer ${res.data.token}`;

          // Retry the original request with the new token
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // If the refresh fails (e.g., completely invalid token, or server error), 
        // clean up token and redirect to login so the user isn't stuck holding a bad token
        localStorage.removeItem("adminToken");
        window.location.href = "/#/admin/login";
        return Promise.reject(refreshError);
      }
    }

    // Default error handling
    return Promise.reject(error);
  }
);

export default axios;
