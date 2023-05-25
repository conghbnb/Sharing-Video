import { act, cleanup, screen, waitFor } from "@testing-library/react";
import LoginOrRegisterForm from "../../../../containers/navbar/loginOrResgisterForm";
import { customRender } from "../../../../utils-for-tests/custom-render";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

test("login with invalid email", async () => {
  customRender(<LoginOrRegisterForm />);

  const invalidEmail = "hagsdgasd";
  const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
  expect(emailInput).toBeInTheDocument();

  userEvent.type(emailInput, invalidEmail);

  act(() => {
    emailInput.blur();
  });

  await waitFor(() => {
    expect(screen.getByText("Invalid email address!")).toBeInTheDocument();
  });
});
