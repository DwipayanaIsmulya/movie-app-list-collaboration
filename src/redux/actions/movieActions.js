import axios from "axios";
import { isAxiosError } from "axios";
import { setPopular } from "../reducers/movieReducer";

export const getPopularMovies = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) return;

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/movie/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response.data;

    dispatch(setPopular(data));
    
  } catch (error) {
    if (isAxiosError(error)) {
      alert(error?.response?.data?.message);
      return;
    }
    alert(error?.message);
  }
};
