import styled from "styled-components";
import { IVideo } from "../../store/types/video";
import React from "react";

const VideoItem = ({ video }: { video: IVideo }) => {
  return (
    <Container>
      <iframe src={video.videoUrl} title="video" allowFullScreen />
      <div>
        <Title>{video.title}</Title>
        <Text>Shared by: {video.user.email}</Text>
        <Text>Desciption:</Text>
        <Desc>
          {video.desc.split(/\\n+/).map((p, index) => (
            <React.Fragment key={index}>
              <span>{p}</span>
              <br />
            </React.Fragment>
          ))}
        </Desc>
      </div>
    </Container> ///hehehe
  );
};

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

export default VideoItem;
