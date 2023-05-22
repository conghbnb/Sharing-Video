import { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import User from '../models/User';
import { CustomError } from '../utils/custom-error';
import jwt from 'jsonwebtoken';

export const signinOrSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    let userResponse;
    //signin
    if (user) {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) return next(new CustomError('Wrong Credentials', 400));
      userResponse = user;
    } else {
      //signup
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      userResponse = await newUser.save();
    }

    const { password, ...userWithoutPassword } = userResponse.toJSON();
    const token = jwt.sign(
      { id: userResponse?._id },
      process.env.JWT as string
    );

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};
