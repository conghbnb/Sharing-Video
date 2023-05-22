import { IVideo } from "../store/types/video";
import axiosClient from "./axiosClient";

const videoApi = {
  getAll(cursor: string) {
    return axiosClient.get<{
      data: IVideo[];
      nextCursor: string | null;
    }>(`/videos?cursor=${cursor}`);
  },
  share(videoData: { title: string; desc: string; videoUrl: string }) {
    return axiosClient.post("/videos", videoData, {
      withCredentials: true,
    });
  },
};

export default videoApi;
