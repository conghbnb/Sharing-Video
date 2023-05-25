import { render, screen } from "@testing-library/react";
import { IVideo } from "../../../../store/types/video";
import VideoItem from "../../../../pages/home/video-item";

test("Renders Video Item", () => {
  const video: IVideo = {
    title: "video title",
    desc: "video desc",
    user: { email: "video email" },
    videoUrl: "video url",
    _id: "1238787",
  };

  render(<VideoItem video={video} />);
  expect(screen.getByText("video title")).toHaveTextContent("video title");
  expect(screen.getByText("video desc")).toHaveTextContent("video desc");
  expect(screen.getByText("Shared by: video email")).toHaveTextContent(
    "Shared by: video email"
  );
});
