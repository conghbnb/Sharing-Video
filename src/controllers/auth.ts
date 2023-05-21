import { NextFunction, Request, Response } from "express";

import bcrypt from "bcryptjs";
import User from "../models/User";
import { CustomError } from "../utils/custom-error";
import jwt from "jsonwebtoken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(new CustomError("User not found!", 404));

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return next(new CustomError("Wrong Credentials", 400));

    const { password, ...userWithoutPassword } = user.toJSON();
    const token = jwt.sign({ id: user._id }, process.env.JWT as string);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};
