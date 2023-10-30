import { combineReducers } from "redux";
import authReducer from "./authReducer";
import heroReducer from "./heroReducer";

// It will be make the reducers to be one temporary state database
// Reducer is like table in database
// And here, we will all the tabl into one database
export default combineReducers({
  auth: authReducer,
  hero: heroReducer,
});
