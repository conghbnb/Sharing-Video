import express, { NextFunction, Request, Response } from 'express';
import authRouter from './routes/auth.route';
import { CustomError } from './utils/custom-error';
import videoRouter from './routes/video.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import './mongo';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
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
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    // credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('notify-new-video', () => {
    console.log('receive');
    socket.broadcast.emit('notify', 'Hello world');
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8800);
