import { useState } from "react";
import {
  Button,
  Container,
  ErrorText,
  Input,
  InputContainer,
  MainContainer,
  Title,
} from "./share-video.styled";
import youtubeApi from "../../api/youtubeApi";
import videoApi from "../../api/videoApi";
import { toast } from "react-toastify";
import { socket } from "../../socket-io";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ShareVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const youtubeParser = (url: string) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const handleShare = async () => {
    setIsSharing(true);
    const videoID = youtubeParser(videoUrl);
    if (!videoID) {
      setInvalidUrl(true);
      setIsSharing(false);
      return;
    }
    try {
      const { data } = await youtubeApi.getVideoData(videoID);
      const { title, description } = data.items[0].snippet;

      await videoApi.share({
        title,
        desc: description,
        videoUrl: `https://www.youtube.com/embed/${videoID}`,
      });
      setVideoUrl("");
      toast("Share video successfully!", { type: "success" });
      if (user?.email) {
        socket.emit("notify-new-video", title, user.email);
      }
    } catch {
      setInvalidUrl(true);
    }
    setInvalidUrl(false);
    setIsSharing(false);
  };

  return (
    <MainContainer>
      <Title>Share a Youtube movie</Title>
      <Container>
        <InputContainer>
          <div>Video URL: </div>
          <Input
            data-testid="video-url-input"
            type="text"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setInvalidUrl(false);
            }}
          />
        </InputContainer>
        {invalidUrl && <ErrorText>Invalid URL!</ErrorText>}
        <Button
          data-testid="submit-btn"
          disabled={isSharing}
          onClick={handleShare}
        >
          {isSharing ? "Sharing..." : "Share"}
        </Button>
      </Container>
    </MainContainer>
  );
};

export default ShareVideo;
