import { NextFunction, Request, Response } from "express";
import Video from "../models/Video";
import { CustomRequest } from "../types/common";

export const addVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newVideo = new Video({
    userId: (req as CustomRequest).decodedToken.id,
    ...req.body,
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const getVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = 5;
  const cursor = req.query.cursor;

  let videos;
  try {
    if (cursor) {
      videos = await Video.find({
        createdAt: {
          $lte: new Date(parseInt(cursor as string)),
        },
      })
        .sort({ createdAt: -1 })
        .limit(limit + 1)
        .exec();
    } else {
      videos = await Video.find({})
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
    res.status(200).json({
      data: videos,
      nextCursor,
    });
  } catch (err) {
    next(err);
  }
};
