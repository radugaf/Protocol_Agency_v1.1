import { combineReducers } from "redux";
import { apis } from "./argusReducer";

const authReducers = combineReducers({
  apis,
});

export default authReducers;
