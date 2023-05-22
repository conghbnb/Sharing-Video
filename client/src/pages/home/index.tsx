import { useEffect, useState } from "react";
import { IVideo } from "../../store/types/video";
import VideoItem from "./video-item";
import styled from "styled-components";
import videoApi from "../../api/videoApi";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [videoListData, setVideoListData] = useState<{
    data: IVideo[];
    nextCursor: string | null;
  }>({ data: [], nextCursor: "" });

  const fetchVideos = async () => {
    const res = await videoApi.getAll(videoListData.nextCursor || "");
    const allVideos = [...videoListData.data, ...res.data.data];
    setVideoListData({ data: allVideos, nextCursor: res.data.nextCursor });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <InfiniteScroll
      dataLength={videoListData.data.length}
      next={fetchVideos}
      hasMore={!!videoListData.nextCursor}
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <Container>
        <VideoList>
          {videoListData.data.map((video) => (
            <VideoItem key={video._id} video={video} />
          ))}
        </VideoList>
      </Container>
    </InfiniteScroll>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const VideoList = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;
`;

export default Home;
