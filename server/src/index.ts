import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import { CustomError } from './utils/custom-error';
import videoRouter from './routes/video';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO as string).then(() => {
    console.log('Connected to db');
  });
};

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/videos', videoRouter);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log('Connect to Server');
});
