import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app, App } from '../app';
import Teams from '../database/models/TeamModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('teams', () => {
  let chaiHttpResponse: Response;

  const teams = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
  ];
  describe('valida respostas da rota /teams', () => {
    it('deve retornar todos os times corretamente no metodo GET /teams', async () => {
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);

      chaiHttpResponse = await chai.request(app).get('/teams')

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(teams)
    })
  })
  describe('valida respostas da rota /teams/id', () => {
    it('deve retornar o time de acordo com a primary key passada e um status 200', async () => {
      sinon.stub(Teams, 'findByPk').resolves(teams[0] as Teams);

      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(teams[0])
    })
    it('deve retornar status 404 caso o id passado não exista', async () => {
      (Teams.findByPk as sinon.SinonStub).restore();
      sinon.stub(Teams, 'findByPk').resolves(null);

      chaiHttpResponse = await chai.request(app).get('/teams/65498546');

      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body.message).to.be.eq('Id not found')
    })
  })
})
