import { Provider } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { RenderOptions, render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import userReducer from "../store/slices/user";
import { IUser } from "../store/types/user";

const customRender = (
  ui: ReactElement,
  initialState?: {
    user?: {
      loading: boolean;
      error: boolean;
      user: IUser | null;
    };
  },
  options?: Omit<RenderOptions, "wrapper">
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const rootReducer = combineReducers({
      user: userReducer,
    });
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";
export { customRender };
