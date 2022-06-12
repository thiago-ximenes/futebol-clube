import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import teamsMock from './mocks/teamsMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Rota teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as []);
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se retorna todos os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    teamsMock.forEach((_teams, index) => {
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[index]).have.property('team_name');
    });
  });
});

describe('Teste um time', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findOne")
      .resolves(teamsMock[0] as any);
  });

  after(() => {
    (Teams.findOne as sinon.SinonStub).restore();
  })
  it('Verifica se um time específico', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).have.property('team_name');
  });
});
