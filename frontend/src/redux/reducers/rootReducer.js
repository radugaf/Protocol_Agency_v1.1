import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import argus from "./argus";
import auth from "./auth";

const rootReducer = combineReducers({
  argusGeneral: argus,
  toastr: toastrReducer,
  auth,
});

export default rootReducer;
