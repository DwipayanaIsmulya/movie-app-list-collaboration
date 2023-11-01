import axios from "axios";
import { setToken } from "../reducers/authReducer";

export const register =
  (name, email, password, password2, navigate, setErrors, errors) =>
  async (dispatch) => {
    try {
      if (password != password2) {
        alert("Password Anda Tidak Sama!");
        return;
      }

      let data = JSON.stringify({
        name,
        email,
        password,
      });

      let config = {
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      dispatch(setToken(token));
      navigate("/");
      setErrors({ ...errors, isError: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message);
        return;
      }
      alert(error?.message);
    }
  };
