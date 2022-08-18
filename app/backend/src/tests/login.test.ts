import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { Response } from 'superagent';
import { hash } from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;
  const userLogin = {
    email: 'teste@teste.com',
    password: 'password'
  }
  describe('valida resposta ao efetuar login', () => {
    beforeEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('deve responder com um token caso o login seja efetuado com sucesso', async () => {
      const passwordEncrypt = await hash('password', 8);
      sinon.stub(User, 'findOne').resolves({
        id: 1,
        username: 'name',
        role: 'role',
        email: 'teste@teste.com',
        password: passwordEncrypt
      } as User);

      chaiHttpResponse = await chai.request(app).post('/login').send(userLogin);

      expect(chaiHttpResponse.body).to.have.key('token').and.not.to.be.an('undefined' || 'null')
    })
  })

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
