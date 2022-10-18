import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import studentReducer from "./students.slice";

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
