import { act, cleanup, screen, waitFor } from "@testing-library/react";
import LoginOrRegisterForm from "../../../../containers/navbar/loginOrResgisterForm";
import { customRender } from "../../../../utils-for-tests/custom-render";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("Login or Signup form", () => {
  test("should render email input", async () => {
    customRender(<LoginOrRegisterForm />);
    const emailInput = screen.getByTestId<HTMLInputElement>("email-input");
    expect(emailInput).toBeInTheDocument();
  });

  test("should render password input", async () => {
    customRender(<LoginOrRegisterForm />);
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();
  });

  test("should render button", async () => {
    customRender(<LoginOrRegisterForm />);
    const btn = screen.getByTestId<HTMLInputElement>("submit-btn");
    expect(btn).toBeInTheDocument();
  });

  test("login with invalid email", async () => {
    customRender(<LoginOrRegisterForm />);

    const invalidEmail = "hagsdgasd";
    const emailInput = screen.getByTestId<HTMLInputElement>("email-input");
    expect(emailInput).toBeInTheDocument();

    userEvent.type(emailInput, invalidEmail);

    act(() => {
      emailInput.blur();
    });

    await waitFor(() => {
      expect(screen.getByText("Invalid email address!")).toBeInTheDocument();
    });
  });
});
