const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

describe('app', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGODB_URI);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe('GET /users/:id', () => {
    describe('GET: when the request is successful', () => {
      it('should return one single user', async () => {
        const response = await supertest(app).get('/users/1');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.user).toEqual(expect.any(Object));
        expect(response.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });
    });

    describe('GET: when the request is unsuccessful', () => {
      it('should return Invalid Id message', async () => {
        const response = await supertest(app).get('/users/10');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Invalid ID');
        expect(response.headers['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });
    });
  });
  describe('POST /register', () => {
    describe('POST: /register, when the request is successful', () => {
      it('should return success message', async () => {
        const response = await supertest(app).post('/register').send({
          user_name: 'test user',
          password: 'test password',
          email: 'test@gmail.com',
          role: 'user',
        });

        expect(response.status).toBe(201);
        expect(response.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
        expect(response.body).toEqual({
          id: expect.any(Number),
          email: expect.any(String),
          role: expect.any(String),
          token: expect.stringContaining('Bearer'),
        });
      });
    });
    describe('POST: /register, when the request is unsuccessful', () => {
      it('should return an error', async () => {
        const response = await supertest(app).post('/register').send({
          user_name: 'user without password',
          email: 'nopassword@gmail.com',
          role: 'guest',
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          status: 'failed',
          message:
            'you should enter email,password,username and the role of user',
        });
      });
    });
  });

  describe('POST /login', () => {
    describe('POST: /login, when the request is successful', () => {
      it('should return success message', async () => {
        const response = await supertest(app).post('/login').send({
          email: 'test@gmail.com',
          password: 'test password',
        });

        expect(response.status).toBe(201);
        expect(response.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
        expect(response.body).toEqual({
          id: expect.any(Number),
          email: expect.any(String),
          role: expect.any(String),
          token: expect.stringContaining('Bearer'),
        });
      });
    });
    describe('POST: /login, when the request is unsuccessful', () => {
      it('should return an error', async () => {
        const response = await supertest(app).post('/login').send({
          email: 'test@gmail.com',
          password: 'wrong password',
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: 'Password or email is wrong',
        });
      });
    });
  });
});
