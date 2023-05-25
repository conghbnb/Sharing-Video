import Video from '../models/Video';

class VideoService {
  static async list(cursor: string) {
    const limit = 5;

    let videos;

    if (cursor) {
      videos = await Video.find({
        createdAt: {
          $lte: new Date(parseInt(cursor)),
        },
      })
        .populate('user', 'email')
        .sort({ createdAt: -1 })
        .limit(limit + 1)
        .exec();
    } else {
      videos = await Video.find({})
        .populate('user', 'email')
        .sort({ createdAt: -1 })
        .limit(limit + 1);
    }
    const max = videos.length === limit + 1;
    let nextCursor = null;
    if (max) {
      const record = videos[limit];
      var unixTimestamp = record.createdAt.getTime();
      nextCursor = unixTimestamp.toString();
      videos.pop();
    }
    return { data: videos, nextCursor };
  }

  static async create(
    id: string,
    videoData: { title: string; desc: string; videoUrl: string }
  ) {
    const newVideo = new Video({
      user: id,
      ...videoData,
    });
    const savedVideo = await newVideo.save();
    return savedVideo;
  }
}

export default VideoService;
