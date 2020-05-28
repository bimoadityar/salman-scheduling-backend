import crypto from 'crypto';

import request from 'supertest';

import { expressApp, knex } from '../loaders';
import config from '../config';
import { Division } from '../models';

const requestApp = request(expressApp);
const {
  api: { prefix },
} = config;

afterAll(async () => {
  await Division.query().delete().where('name', 'like', '$%');
  await knex.destroy();
});

describe('Division Route', () => {
  describe('POST /divisions', () => {
    it('return created', async () => {
      const res = await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePOSTReturnCreated' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        status: 'success',
        data: {
          division: {
            id: expect.any(Number),
            name: '$divNamePOSTReturnCreated',
          },
        },
      });
    });

    it('validate input', async () => {
      const res = await request(expressApp)
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        status: 'fail',
        data: { name: 'name is a required property' },
      });

      const res2 = await request(expressApp)
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '' });
      expect(res2.statusCode).toEqual(400);
      expect(res2.body).toEqual({
        status: 'fail',
        data: {
          name:
            'name should match pattern "^[ -~]+$", should NOT be shorter than 1 characters',
        },
      });

      const res3 = await request(expressApp)
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: crypto.randomBytes(40).toString('hex') });
      expect(res3.statusCode).toEqual(400);
      expect(res3.body).toEqual({
        status: 'fail',
        data: {
          name: 'name should NOT be longer than 60 characters',
        },
      });
    });

    it('check conflict', async () => {
      await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePOSTCheckConflict' });

      const res = await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePOSTCheckConflict' });

      expect(res.statusCode).toEqual(409);
      expect(res.body).toEqual({
        status: 'fail',
        data: {
          name: 'name already exist',
        },
      });
    });
  });

  describe('GET /divisions', () => {
    it('return OK', async () => {
      await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNameGETReturnOk' });

      await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNameGETReturnOk2' });

      await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNameGETReturnOk3' });

      const res = await requestApp
        .get(`${prefix}/divisions`)
        .set('Accept', 'application/json');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        status: 'success',
        data: { divisions: expect.any(Array) },
      });
      expect(res.body.data.divisions).toContainEqual({
        id: expect.any(Number),
        name: '$divNameGETReturnOk',
      });
      expect(res.body.data.divisions).toContainEqual({
        id: expect.any(Number),
        name: '$divNameGETReturnOk2',
      });
      expect(res.body.data.divisions).toContainEqual({
        id: expect.any(Number),
        name: '$divNameGETReturnOk3',
      });
    });
  });

  describe('GET /divisions/:id', () => {
    it('return OK', async () => {
      const res = await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNameGETidReturnOk' });

      const {
        body: {
          data: {
            division: { id },
          },
        },
      } = res;

      const res2 = await requestApp
        .get(`${prefix}/divisions/${id}`)
        .set('Accept', 'application/json');
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toEqual({
        status: 'success',
        data: { division: { id, name: '$divNameGETidReturnOk' } },
      });
    });

    it('check not found', async () => {
      const res = await requestApp
        .get(`${prefix}/divisions/0`)
        .set('Accept', 'application/json');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({
        status: 'fail',
        data: { division: "division requested doesn't exist" },
      });
    });

    it('validate id', async () => {
      const res = await requestApp
        .get(`${prefix}/divisions/no1`)
        .set('Accept', 'application/json');
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({
        status: 'fail',
        data: { id: "id isn't a valid integer" },
      });
    });
  });

  describe('PATCH /divisions/:id', () => {
    it('return OK', async () => {
      const res = await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePATCHReturnOK' });

      const {
        body: {
          data: {
            division: { id },
          },
        },
      } = res;

      const res2 = await requestApp
        .patch(`${prefix}/divisions/${id}`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePATCHReturnOK2' });

      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toEqual({
        status: 'success',
        data: {
          division: { id: expect.any(Number), name: '$divNamePATCHReturnOK2' },
        },
      });
    });

    it('validate input', async () => {
      const res = await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePATCHValidateInput' });

      const {
        body: {
          data: {
            division: { id },
          },
        },
      } = res;

      const res2 = await request(expressApp)
        .patch(`${prefix}/divisions/${id}`)
        .set('Accept', 'application/json')
        .send({});

      expect(res2.statusCode).toEqual(404);
      expect(res2.body).toEqual({
        status: 'fail',
        data: { division: "division requested doesn't exist" },
      }); // knex empty patch behavior is not found

      const res3 = await request(expressApp)
        .patch(`${prefix}/divisions/${id}`)
        .set('Accept', 'application/json')
        .send({ name: '' });
      expect(res3.statusCode).toEqual(400);
      expect(res3.body).toEqual({
        status: 'fail',
        data: {
          name:
            'name should match pattern "^[ -~]+$", should NOT be shorter than 1 characters',
        },
      });

      const res4 = await request(expressApp)
        .patch(`${prefix}/divisions/${id}`)
        .set('Accept', 'application/json')
        .send({ name: crypto.randomBytes(40).toString('hex') });
      expect(res4.statusCode).toEqual(400);
      expect(res4.body).toEqual({
        status: 'fail',
        data: {
          name: 'name should NOT be longer than 60 characters',
        },
      });
    });

    it('check conflict', async () => {
      await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePATCHCheckConflict' });

      const res = await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePATCHCheckConflict2' });

      const {
        body: {
          data: {
            division: { id },
          },
        },
      } = res;

      const res2 = await request(expressApp)
        .patch(`${prefix}/divisions/${id}`)
        .set('Accept', 'application/json')
        .send({ name: '$divNamePATCHCheckConflict' });

      expect(res2.statusCode).toEqual(409);
      expect(res2.body).toEqual({
        status: 'fail',
        data: {
          name: 'name already exist',
        },
      });
    });
  });

  describe('DELETE /divisions/:id', () => {
    it('return OK', async () => {
      const res = await requestApp
        .post(`${prefix}/divisions`)
        .set('Accept', 'application/json')
        .send({ name: '$divNameDELETEReturnOk' });

      const {
        body: {
          data: {
            division: { id },
          },
        },
      } = res;

      const res2 = await requestApp
        .delete(`${prefix}/divisions/${id}`)
        .set('Accept', 'application/json');

      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toEqual({ status: 'success', data: null });
    });

    it('check not found', async () => {
      const res = await requestApp
        .delete(`${prefix}/divisions/0`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({
        status: 'fail',
        data: { division: "division requested doesn't exist" },
      });
    });
  });
});
