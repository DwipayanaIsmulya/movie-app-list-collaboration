import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import detailReducer from "./detailReducer";
import allMovieReducer from "./allMovieReducer";
import heroReducer from "./heroReducer";
import searchReducer from "./searchReducer";

// It will be make the reducers to be one temporary state database
// Reducer is like table in database
// And here, we will all the tabl into one database
export default combineReducers({
  auth: authReducer,
  movie: movieReducer,
  detail: detailReducer,
  seeAll: allMovieReducer,
  hero: heroReducer,
  search: searchReducer,
});
