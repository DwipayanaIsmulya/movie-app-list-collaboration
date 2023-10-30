import axios from "axios";
import { setHero } from "../reducers/heroReducer";

export const heroMovieSlider = (setErrors, errors) => async (dispatch) => {
  try {
    // Get token from local storage
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/popular`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response.data;

    //perulangan untuk menampilkan 3 data di main section
    const popular = data.slice(7, 11);

    dispatch(setHero(popular));
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
