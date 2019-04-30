import { combineReducers } from "redux";
import fetchDataReducer from "./fetchData";

const rootReducer = combineReducers({
  fetchData: fetchDataReducer
});
export default rootReducer;
