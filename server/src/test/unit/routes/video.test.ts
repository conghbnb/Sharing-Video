// @ts-nocheck
import supertest from 'supertest';
import { jest, expect } from '@jest/globals'; // eslint-disable-line
import server from '../../..';
import VideoService from '../../../services/video.service';
import UserService from '../../../services/user.service';
import jwt from 'jsonwebtoken';
import config from '../../../utils/config';

jest.mock('../../../services/video.service');
jest.mock('../../../services/user.service');

const user = { email: 'test@example.com' };
UserService.authenticateWithToken = jest
  .fn()
  .mockResolvedValue({ user, token: 'jwt' });

describe('/api/videos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET lists all the videos', async () => {
    const data = [
      { user: '27327634', title: 'test', desc: 'test', videoUrl: 'test' },
      {
        user: '223237327634',
        title: 'test1',
        desc: 'test1',
        videoUrl: 'test1',
      },
    ];
    VideoService.list = jest.fn().mockResolvedValue({ data, nextCursor: null });
    const req = supertest(server);
    const res = await req.get('/api/videos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data, nextCursor: null });
    expect(VideoService.list).toHaveBeenCalled();
  });

  test('anonymous requests are blocked', async () => {
    const data = {
      user: '234234',
      title: 'test',
      desc: 'test',
      videoUrl: 'test',
    };
    VideoService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(server);
    const res = await req
      .post('/api/videos')
      .set('cookie', 'fake token')
      .send(data);
    expect(res.status).toBe(401);
  });

  test('add new video', async () => {
    jest.mock('../../../middlewares/verify-token');

    const user = '234234';

    const videoData = {
      title: 'test',
      desc: 'test',
      videoUrl: 'test',
    };

    const token = jwt.sign({ id: user }, config.JWT);

    VideoService.create = jest.fn().mockResolvedValue({ user, ...videoData });
    const req = supertest(server);
    const res = await req
      .post('/api/videos')
      .set('cookie', `access_token=${token}`)
      .send(videoData);
    expect(res.body).toEqual({ user, ...videoData });
    expect(res.status).toBe(200);
    expect(VideoService.create).toHaveBeenCalledWith(user, videoData);
  });
});
