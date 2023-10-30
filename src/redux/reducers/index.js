import { combineReducers } from "redux";
import movieReducer from "./movieReducer";

// It will be make the reducers to be one temporary state database
// Reducer is like table in database
// And here, we will all the tabl into one database
export default combineReducers({
  // code here
  movie: movieReducer,
});
