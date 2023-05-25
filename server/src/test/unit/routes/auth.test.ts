// @ts-nocheck
import supertest from 'supertest';
import { jest, expect } from '@jest/globals';
import server from '../../..';
import UserService from '../../../services/user.service';

jest.mock('../../../services/user.service');

describe('POST /api/auth/signinOrSignup', () => {
  const user = { email: 'test@example.com' };

  test('login or register with correct email and password succeeds', async () => {
    UserService.authenticateWithPassword = jest
      .fn()
      .mockResolvedValue({ user, token: 'jwt' });

    const req = supertest(server);
    const res = await req
      .post('/api/auth/signinOrSignup')
      .send({ email: 'test@example.com', password: 'secret' });
    expect(UserService.authenticateWithPassword).toHaveBeenCalledWith(
      'test@example.com',
      'secret'
    );
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual(user);
  });

  test('login without parameters fails', async () => {
    const req = supertest(server);
    const res = await req.post('/api/auth/signinOrSignup');
    expect(res.status).toBe(400);
  });
});
