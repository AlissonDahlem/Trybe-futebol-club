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

describe('/login', () => {
  let chaiHttpResponse: Response;
  const userLogin = {
    email: 'teste@teste.com',
    password: 'password'
  }
  describe('valida resposta ao efetuar login', () => {
    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    it('deve responder com um token caso o login seja efetuado com sucesso', async () => {
      const passwordEncrypt = await hash('password', 8);
      sinon.stub(Users, 'findOne').resolves({
        id: 1,
        username: 'name',
        role: 'role',
        email: 'teste@teste.com',
        password: passwordEncrypt
      } as Users);

      chaiHttpResponse = await chai.request(app).post('/login').send(userLogin);

      expect(chaiHttpResponse.body).to.have.key('token').and.not.to.be.an('undefined' || 'null')
    })
    it('caso o campo email ou password não seja preenchido deve retornar um erro com status 400', async () => {
      const request = { }
      chaiHttpResponse = await chai.request(app).post('/login').send(request);
      expect(chaiHttpResponse.status).to.be.eq(400)
      expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled')
    })
    it('caso a senha ou email esteja incorreto deve retornar um erro com status 401 Unauthorized', async () => {
      (Users.findOne as sinon.SinonStub).restore();
      const request = {
        email: 'teste@teste.com',
        password: 'password'
      };

      sinon.stub(Users, 'findOne').resolves(null)

      chaiHttpResponse = await chai.request(app).post('/login').send(request);
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password')
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
});
