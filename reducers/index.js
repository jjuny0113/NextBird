import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;
