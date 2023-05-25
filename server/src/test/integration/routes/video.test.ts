import server from '../../..';
import supertest from 'supertest';
import { expect, test } from '@jest/globals';

process.env.NODE_ENV = 'test';

describe('GET /api/videos', () => {
  test('Should get all video', async () => {
    const req = supertest(server);
    const res = await req.get('/api/videos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 10000);
});

describe('POST /api/videos', () => {
  let video = {
    title: 'The Lord of the Rings',
    desc: 'J.R.R. Tolkien',
    videoUrl: 'https://www.youtube.com/embed/u72GQsU_um4',
  };
  test('Should add a video', async () => {
    const user = {
      email: 'kong.lee@vinova.com.sg',
      password: 'cong2610',
    };
    const req = supertest(server);
    const authRes = await req.post('/api/auth/signinOrSignup').send(user);

    const cookies = authRes.header['set-cookie'].pop().split(';')[0];

    const res = await req
      .post('/api/videos')
      .set('cookie', cookies)
      .send(video);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(video.title);
    expect(res.body.desc).toBe(video.desc);
    expect(res.body.videoUrl).toBe(video.videoUrl);
  });

  test('Should is blocked', async () => {
    let video = {
      title: 'The Lord of the Rings',
      desc: 'J.R.R. Tolkien',
      videoUrl: 'https://www.youtube.com/embed/u72GQsU_um4',
    };
    const req = supertest(server);
    const res = await req.post('/api/videos').set('cookie', 'fake').send(video);

    expect(res.status).toBe(401);
  });
});
