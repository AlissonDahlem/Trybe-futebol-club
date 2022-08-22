import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';
import { Response } from 'superagent';
import { hash } from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Server error 500', () => {
  let chaiHttpResponse: Response
  const userLogin = {
    email: 'teste@teste.com',
    password: 'password'
  }
  it('deve retornar erro status 500 com mensagem do erro', async () => {
    (Users.findOne as sinon.SinonStub).restore();
    const passwordEncrypt = await hash('password', 8);
    sinon.stub(Users, 'findOne').throws()

    chaiHttpResponse = await chai.request(app).post('/login').send(userLogin);

    expect(chaiHttpResponse.status).to.be.eq(500)
    expect(chaiHttpResponse.body).to.have.key('message')
  })
})´