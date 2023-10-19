import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login");
        }

        await axios.get(`${import.meta.env.VITE_API_AUTH_URL}/api/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If token is not valid
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            return navigate("/login");
          }

          alert(error?.response?.data?.message);
          return;
        }

        alert(error?.message);
      }
    };

    getMe();
  }, [navigate]);

  return children;
};

export default Protected;
