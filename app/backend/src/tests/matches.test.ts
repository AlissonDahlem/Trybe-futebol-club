import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';
import { Response } from 'superagent';
import IMatches from '../interfaces/IMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', () => {
  let chaiHttpResponse: Response;
  const allMatches = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    },
  ] as IMatches[]
  describe('verifica respostas do endpoint /matches', () => {
    it('verifica se ao fazer uma requisição do metodo GET para o endpoint /matches retorna todas as partidas salvas no banco de dados', async () => {
      sinon.stub(Matches, 'findAll').resolves(allMatches)

      chaiHttpResponse = await chai.request(app).get('/matches')

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(allMatches);
    })
  })
})