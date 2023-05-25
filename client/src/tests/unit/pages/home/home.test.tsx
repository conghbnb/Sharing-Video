// @ts-nocheck
import { cleanup, render, screen } from "@testing-library/react";
import Home from "../../../../pages/home";
import { customRender } from "../../../../utils-for-tests/custom-render";
import videoApi from "../../../../api/videoApi";

jest.mock("../../../../api/videoApi");

afterEach(cleanup);

test("Renders Home With No data", () => {
  customRender(<Home />);
  expect(screen.getByText("Video not found")).toHaveTextContent(
    "Video not found"
  );
});

test("Renders Home With data", async () => {
  videoApi.getAll.mockResolvedValue({
    data: {
      data: [{ title: "test", user: "2324234", desc: "test", _id: "345" }],
    },
  });
  const { asFragment } = render(<Home />);
  const listNode = await screen.findByTestId("list");
  expect(listNode.childNodes).toHaveLength(1);
  expect(asFragment()).toMatchSnapshot();
});
