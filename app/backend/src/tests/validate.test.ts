import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';
import { Response } from 'superagent';
const jwt = require('jsonwebtoken')
// chai.use(chaiHttp);

const { expect } = chai;

describe('/login/validate', () => {
  let chaiHttpResponse: Response;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkWThBYmk4alh2c1h5cW0ucm1wMEIudVFCQTVxVXo3VDZHaGxnL0N2VnIvZ0x4WWo1VUFaVk8ifSwiX2NoYW5nZWQiOnt9LCJfb3B0aW9ucyI6eyJpc05ld1JlY29yZCI6ZmFsc2UsIl9zY2hlbWEiOm51bGwsIl9zY2hlbWFEZWxpbWl0ZXIiOiIiLCJyYXciOnRydWUsImF0dHJpYnV0ZXMiOlsiaWQiLCJ1c2VybmFtZSIsInJvbGUiLCJlbWFpbCIsInBhc3N3b3JkIl19LCJpc05ld1JlY29yZCI6ZmFsc2UsImlhdCI6MTY2MTE4OTQ3MiwiZXhwIjoxNjYxMjc1ODcyfQ.MLnIH6GdAzIkipyQPRhhR5cGFIFXMaV9shlBjkHIhsc';

  describe('valida resposta ao validar usuario', () => {
    it('deve retornar um erro caso o token esteja inválido', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').set({authorization: token})
      
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq('Expired or invalid token')
    })
    it('caso não seja passado um token deve retornar Token not found', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').set({});

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq('Token not found')
    })
    it('deve retornar a role do usuario caso o token seja valido', async () => {
      sinon.stub(jwt, 'verify').resolves({
        dataValues: {
          role: 'user'
        }
      })
      chaiHttpResponse = await chai.request(app).get('/login/validate').set({authorization: token})
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.role).to.be.eq('user')
    })
  })
})