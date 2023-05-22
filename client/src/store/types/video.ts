export interface IVideo {
  _id: string;
  user: { email: string };
  title: string;
  desc: string;
  videoUrl: string;
}
