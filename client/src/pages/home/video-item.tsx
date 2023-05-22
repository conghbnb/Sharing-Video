import styled from "styled-components";
import { IVideo } from "../../store/types/video";

const Title = styled.div`
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

const Text = styled.div`
  color: grey;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
  line-height: 24px;
  text-align: justify;
  text-justify: inter-word;
`;

const Desc = styled.div`
  color: #4c4a37;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  line-height: 32px;
  text-overflow: scroll;
  overflow-y: scroll;
  height: 120px;
  white-space: pre-wrap;
`;

const VideoItem = ({ video }: { video: IVideo }) => {
  return (
    <Container>
      <iframe src={video.videoUrl} title="video" allowFullScreen />
      <div>
        <Title>{video.title}</Title>
        <Text>Shared by: {video.userId}</Text>
        <Text>Desciption:</Text>
        <Desc>
          {video.desc.split(/\\n+/).map((p) => (
            <>
              <span>{p}</span>
              <br />
            </>
          ))}
        </Desc>
      </div>
    </Container>
  );
};

export default VideoItem;
