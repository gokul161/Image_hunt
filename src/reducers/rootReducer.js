import { combineReducers } from "redux";
import imageReducer from "./imageReducer";

const rootReducer = combineReducers({
  image: imageReducer
});
export default rootReducer;