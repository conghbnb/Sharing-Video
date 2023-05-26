import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import videoApi from "../../../../api/videoApi";
import ShareVideo from "../../../../pages/share-video";
import youtubeApi from "../../../../api/youtubeApi";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../../../utils-for-tests/custom-render";

jest.mock("../../../../api/videoApi");
jest.mock("../../../../api/youtubeApi");

afterEach(cleanup);

test("form submit", async () => {
  (videoApi.share as jest.MockedFunction<() => Promise<any>>).mockResolvedValue(
    {}
  );
  (
    youtubeApi.getVideoData as jest.MockedFunction<() => Promise<any>>
  ).mockResolvedValue({
    data: { items: [{ snippet: { title: "test", description: "test" } }] },
  });
  customRender(<ShareVideo />);

  const videoUrlInput = screen.getByRole<HTMLInputElement>("textbox");

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
  customRender(<ShareVideo />);

  const videoUrlInput = screen.getByRole<HTMLInputElement>("textbox");

  expect(videoUrlInput).toBeInTheDocument();

  const invalidUrl = "asjahsdjasd";
  fireEvent.change(videoUrlInput, { target: { value: invalidUrl } });
  expect(videoUrlInput.value).toBe(invalidUrl);

  userEvent.click(screen.getByTestId("submit-btn"));

  expect(screen.getByText("Invalid URL!")).toHaveTextContent("Invalid URL!");
});
