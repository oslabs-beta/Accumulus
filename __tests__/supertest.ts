import request from 'supertest';
import app from '../server/server';
const server = 'http://localhost:3000';

const mockResponse = () => {
  const res = {
    status: () => res, 
    json: () => res
  };
  return res;
};

describe('Router Testing Suite', () => {

})
describe('Home Route Integration Test', () => {
  describe('/api/aws/', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', async () => {
        return request(server)
          .get('/api/aws/')
          .expect('Content-Type', /json/)
          .expect(200)
      });
    });
  });
})

