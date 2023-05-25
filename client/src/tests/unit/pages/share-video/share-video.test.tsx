// @ts-nocheck
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import videoApi from "../../../../api/videoApi";
import ShareVideo from "../../../../pages/share-video";
import youtubeApi from "../../../../api/youtubeApi";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../api/videoApi");
jest.mock("../../../../api/youtubeApi");

afterEach(cleanup);

test("form submit", async () => {
  videoApi.share.mockResolvedValue({});
  youtubeApi.getVideoData.mockResolvedValue({
    data: { items: [{ snippet: { title: "test", description: "test" } }] },
  });

  render(<ShareVideo />);

  const videoUrlInput = screen.getByRole("textbox");

  expect(videoUrlInput).toBeInTheDocument();

  const videoUrl = "https://www.youtube.com/watch?v=JJbhrGX6Vp0";
  fireEvent.change(videoUrlInput, { target: { value: videoUrl } });
  expect(videoUrlInput.value).toBe(videoUrl);

  await waitFor(async () => {
    await userEvent.click(screen.getByTestId("submit-btn"));
    expect(videoUrlInput.value).toBe("");
  });
});

test("Validate Url", () => {
  render(<ShareVideo />);

  const videoUrlInput = screen.getByRole("textbox");

  expect(videoUrlInput).toBeInTheDocument();

  const invalidUrl = "asjahsdjasd";
  fireEvent.change(videoUrlInput, { target: { value: invalidUrl } });
  expect(videoUrlInput.value).toBe(invalidUrl);

  userEvent.click(screen.getByTestId("submit-btn"));

  expect(screen.getByText("Invalid URL!")).toHaveTextContent("Invalid URL!");
});
