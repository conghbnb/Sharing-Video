import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/user";

const setupIntegrationTest = () => {
  const rootReducer = combineReducers({
    user: userReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

export default setupIntegrationTest;
