import { NextFunction, Request, Response } from 'express';
import { CustomError } from './custom-error';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/common';
import config from '../utils/config';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return next(new CustomError('You are not authenticated!', 401));

  try {
    const decodedToken = jwt.verify(token, config.JWT) as jwt.JwtPayload;
    (req as CustomRequest).decodedToken = decodedToken;
    next();
  } catch {
    next(new CustomError('Token is not valid!', 403));
  }
};
