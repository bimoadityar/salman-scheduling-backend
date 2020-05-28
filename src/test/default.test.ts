import crypto from 'crypto';

import request from 'supertest';

import { expressApp } from '../loaders';
import config from '../config';

const requestApp = request(expressApp);
const {
  api: { prefix },
} = config;

describe('Default Route', () => {
  describe('GET /status', () => {
    it('return OK', async () => {
      const res = await requestApp
        .get(`${prefix}/status`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ status: 'success', data: null });
    });
  });

  describe('HEAD /status', () => {
    it('return OK', async () => {
      const res = await requestApp.head(`${prefix}/status`);

      expect(res.statusCode).toEqual(200);
    });
  });

  describe('Unknown route', () => {
    it('return not found', async () => {
      await Promise.all(
        Array.from(Array(5), async () => {
          const randomPath = '/' + crypto.randomBytes(5).toString('hex');
          const res = await requestApp
            .get(randomPath)
            .set('Accept', 'application/json');

          expect(res.statusCode).toEqual(404);
          expect(res.body).toEqual({
            status: 'fail',
            data: { path: "method requested doesn't exist" },
          });
        }),
      );
    });
  });
});

test('placeholder', () => {
  expect(true).toEqual(true);
});
