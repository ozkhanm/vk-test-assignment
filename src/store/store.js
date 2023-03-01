import { configureStore, combineReducers } from "@reduxjs/toolkit";

import boardReducer from "./reducers/BoardSlice";

const rootReducer = combineReducers({
  boardReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
};
