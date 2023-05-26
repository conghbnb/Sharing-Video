import express, { NextFunction, Request, Response } from 'express';
import authRouter from './routes/auth.route';
import { CustomError } from './middlewares/custom-error';
import videoRouter from './routes/video.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import './mongo';
import config from './utils/config';
import notificationQueue from './utils/queue';
import jwt from 'jsonwebtoken';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: config.CLIENT_APP,
  })
);
app.use(cookieParser());
app.use(express.json());
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

//socket.io
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: config.CLIENT_APP,
    credentials: true,
  },
});

// uncomment with production
// comment because of issue: https://github.com/carhartl/typescript-cookie/issues/1

// io.use((socket, next) => {
//   try {
//     const token = socket.handshake.auth.token;
//     jwt.verify(token, config.JWT);
//     next();
//   } catch {
//     next(new Error('not authenticated'));
//   }
// });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('notify-new-video', (...args) => {
    notificationQueue.addNotificationToQueue({
      title: args[0],
      email: args[1],
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

if (config.NODE_ENV !== 'test') {
  server.listen(config.PORT);
}

export default server;
