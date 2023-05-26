import {
  AnyAction,
  CombinedState,
  EmptyObject,
  ThunkMiddleware,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../../App";
import setupIntegrationTest from "../../utils-for-tests/setup-integration-test";
import { IUserState } from "../../store/slices/user";
import authApi from "../../api/authApi";
import youtubeApi from "../../api/youtubeApi";
import videoApi from "../../api/videoApi";

// for issue: https://github.com/prisma/prisma/issues/8558
global.setImmediate =
  global.setImmediate ||
  ((fn: any, ...args: any[]) => global.setTimeout(fn, 0, ...args));

jest.mock("../../api/authApi");
jest.mock("../../api/videoApi");
jest.mock("../../api/youtubeApi");

describe("App", () => {
  let store: ToolkitStore<
    EmptyObject & {
      user: IUserState;
    },
    AnyAction,
    [
      ThunkMiddleware<
        CombinedState<{
          user: IUserState;
        }>,
        AnyAction
      >
    ]
  >;

  const email = "test@example.com";

  beforeEach(() => {
    store = setupIntegrationTest();

    (
      authApi.signinOrSignup as jest.MockedFunction<() => Promise<any>>
    ).mockResolvedValue({
      email,
      _id: "125635",
    });
  });

  test("render user after login and remove user after logout", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const emailInput = screen.getByTestId<HTMLInputElement>("email-input");
    const passwordInput =
      screen.getByTestId<HTMLInputElement>("password-input");
    const btn = screen.getByTestId<HTMLButtonElement>("submit-btn");

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    await act(() => {
      btn.click();
    });

    const wellcomeText = await screen.findByText("Wellcome " + email);
    expect(wellcomeText).toBeInTheDocument();

    const logoutBtn = screen.getByText<HTMLButtonElement>("Logout");

    await act(() => {
      logoutBtn.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("email-input")).toBeInTheDocument();
    });
  });

  test("Should login and share a video successfully", async () => {
    (
      videoApi.share as jest.MockedFunction<() => Promise<any>>
    ).mockResolvedValue({});
    (
      youtubeApi.getVideoData as jest.MockedFunction<() => Promise<any>>
    ).mockResolvedValue({
      data: { items: [{ snippet: { title: "test", description: "test" } }] },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const emailInput = screen.getByTestId<HTMLInputElement>("email-input");
    const passwordInput =
      screen.getByTestId<HTMLInputElement>("password-input");
    const btn = screen.getByTestId<HTMLButtonElement>("submit-btn");

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    await act(() => {
      btn.click();
    });

    const shareMovieBtn = await screen.findByText("Share a movie");

    await act(() => {
      shareMovieBtn.click();
    });

    const videoUrlInput = await screen.findByTestId("video-url-input");
    const shareBtn = await screen.findByTestId("submit-btn");

    expect(videoUrlInput).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();

    fireEvent.change(videoUrlInput, {
      target: { value: "https://www.youtube.com/watch?v=Oixyvm0GFLc" },
    });

    await act(() => {
      shareBtn.click();
    });

    const successMsg = await screen.findByText("Share video successfully!");
    expect(successMsg).toBeInTheDocument();
  });
});
