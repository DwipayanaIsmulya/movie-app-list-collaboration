import axios from "axios";
import { setDetails } from "../reducers/detailReducer";

export const getDetailsMovie = (movieId, setErrors, errors) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) return;

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response.data;

    dispatch(setDetails(data));
    setErrors({ ...errors, isError: false });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors({
        ...errors,
        isError: true,
        message: error?.response?.data?.status_message || error?.message,
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
