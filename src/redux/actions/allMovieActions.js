import axios from "axios";
import { setAllMovie } from "../reducers/allMovieReducer";

export const getAllMovie = (setErrors, errors) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) return;

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response.data;

    dispatch(setAllMovie(data));
    setErrors({ ...errors, isError: false });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors({
        ...errors,
        isError: true,
        message: error?.response?.data?.message || error?.message,
      });
    }

    alert(error?.message);
    setErrors({
      ...errors,
      isError: true,
      message: error?.message,
    });
  }
};
