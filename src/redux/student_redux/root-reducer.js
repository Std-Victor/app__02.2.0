import { combineReducers } from "redux";

import studentReducer from "./student/student.reducer";

export default combineReducers({
  std: studentReducer,
});
