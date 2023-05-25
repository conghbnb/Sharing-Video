import server from '../../..';
import User from '../../../models/User';
import supertest from 'supertest';
import { expect, beforeAll } from '@jest/globals';

process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await User.deleteOne({ email: 'kong.lee@vinova.com.sg' });
}, 10000);

describe('POST /api/auth/signinOrSignup', () => {
  test('Should register user and return jwt token', async () => {
    const user = {
      email: 'kong.lee@vinova.com.sg',
      password: 'cong2610',
    };
    const req = supertest(server);
    const res = await req.post('/api/auth/signinOrSignup').send(user);
    expect(res.status).toBe(200);
    expect(res.headers).toHaveProperty('set-cookie');
  });

  test('Should login user and return jwt token', async () => {
    const user = {
      email: 'kong.lee@vinova.com.sg',
      password: 'cong2610',
    };
    const req = supertest(server);
    const res = await req.post('/api/auth/signinOrSignup').send(user);
    expect(res.status).toBe(200);
    expect(res.headers).toHaveProperty('set-cookie');
  });

  test('Should reject invalid login', async () => {
    const user = {
      email: 'kong.lee@vinova.com.sg',
      password: 'cong1111',
    };
    const req = supertest(server);
    const res = await req.post('/api/auth/signinOrSignup').send(user);
    expect(res.status).toBe(401);
  });
});
