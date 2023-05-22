import axios from "axios";

const client = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});

const youtubeApi = {
  getVideoData(id: string) {
    return client.get<{
      items: { snippet: { title: string; description: string } }[];
    }>(`https://www.googleapis.com/youtube/v3/videos?id=${id}`);
  },
};

export default youtubeApi;
