import axios from "axios";
import { useEffect, useState } from "react";
import { IVideo } from "../../store/types/video";
import VideoItem from "./video-item";
import styled from "styled-components";
import Navbar from "../../containers/navbar";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const VideoList = styled.div`
  width: 60%;
`;

const Home = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get("http://localhost:8800/api/videos");
      setVideos(res.data.data);
    };
    fetchVideos();
  }, []);

  return (
    <Container>
      <Navbar />
      <VideoList>
        {videos.map((video) => (
          <VideoItem key={video.videoUrl} video={video} />
        ))}
      </VideoList>
    </Container>
  );
};

export default Home;
