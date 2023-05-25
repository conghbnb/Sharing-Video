import { NextFunction, Request, Response } from 'express';
import VideoService from '../services/video.service';
import { CustomRequest } from '../types/common';

export const addVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const savedVideo = await VideoService.create(
      (req as CustomRequest).decodedToken.id,
      req.body
    );
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
  try {
    const data = await VideoService.list(req.query.cursor as string);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
