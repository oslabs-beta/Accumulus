// import 'regenerator-runtime/runtime';

const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000'

describe('Route integration', () => {
  describe('/api/user/login', () => {
    describe('GET', () => {
      xit ('responds with 200 status and json content type', async () => {
        return request(server)
          .get('/api/user/login')
          .expect('Content-Type', /json/)
          .expect(200)
      })
    })
  })
})