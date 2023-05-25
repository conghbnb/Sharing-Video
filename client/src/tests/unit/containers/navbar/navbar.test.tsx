import { screen } from "@testing-library/react";
import Navbar from "../../../../containers/navbar";
import { customRender } from "../../../../utils-for-tests/custom-render";

test("Renders Navbar without user", () => {
  customRender(<Navbar />);

  expect(screen.getByText("Login/Register")).toBeInTheDocument();
  expect(screen.getByTestId("email-input")).toBeInTheDocument();
  expect(screen.getByTestId("password-input")).toBeInTheDocument();
});

test("Renders Navbar with user", () => {
  const user = { email: "test@example.com", _id: "162361" };

  customRender(<Navbar />, {
    user: {
      loading: false,
      error: false,
      user,
    },
  });

  expect(screen.getByText(`Wellcome ${user.email}`)).toBeInTheDocument();
  expect(screen.getByText("Logout")).toBeInTheDocument();
});
