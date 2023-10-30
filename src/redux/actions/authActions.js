import axios from "axios";
import { setToken, setUser } from "../reducers/authReducer";

export const login =
  (email, password, navigate, setErrors, errors) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      const { data } = response.data;
      const { token } = data;

      dispatch(setToken(token));
      navigate("/");
      setErrors({ ...errors, isError: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors({
          ...errors,
          isError: true,
          message: error?.response?.data?.message || error?.message,
        });
        return;
      }

      alert(error?.message);
      setErrors({
        ...errors,
        isError: true,
        message: error?.message,
      });
    }
  };

export const registerLoginWithGoogleAction =
  (accessToken, navigate) => async (dispatch) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      dispatch(setToken(token));

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const getMe =
  (navigate, navigatePathSuccess, navigatePathError) =>
  async (dispatch, getState) => {
    try {
      let { token } = getState().auth;

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response.data;

      dispatch(setUser(data));

      if (navigatePathSuccess) navigate(navigatePathSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If token is not valid
        if (error.response.status === 401) {
          dispatch(logout());

          if (navigatePathError) navigate(navigatePathError);
          return;
        }

        alert(error?.response?.data?.message);
        return;
      }

      alert(error?.message);
    }
  };
