import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../middlewares/custom-error';
import UserService from '../services/user.service';

export const signinOrSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(new CustomError('Invalid body!', 400));
    }

    const data = await UserService.authenticateWithPassword(
      req.body.email,
      req.body.password
    );

    if (!data) {
      return next(new CustomError('Authentication failed', 401));
    }

    res.cookie('access_token', data.token).status(200).json(data.user);
  } catch (err) {
    next(err);
  }
};
