import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

import studentReducer from "./student.reducer";

const middlewares = [logger];

const store = createStore(studentReducer, applyMiddleware(...middlewares));

export default store;
