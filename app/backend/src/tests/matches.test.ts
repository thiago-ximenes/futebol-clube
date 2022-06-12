import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';
import matchesMock from './mocks/matcheMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Rota matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesMock as []);
    sinon
      .stub(Matches, "findByPk")
      .resolves(matchesMock[0] as any);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
    (Matches.findByPk as sinon.SinonStub).restore();
  })

  it('Verifica se retorna todas as partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(matchesMock);
  });

  it('Verifica se retorna uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches/1')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('homeTeam');
    expect(chaiHttpResponse.body).to.be.equal(matchesMock[0]);
  });

  it('Verifica se retorna uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 2,
        inProgress: true,
      })

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.have.property('homeTeam');
    expect(chaiHttpResponse.body).to.have.property('homeTeam');
    expect(chaiHttpResponse.body).to.be.equal({
      id: 51,
      homeTeam: 1,
      awayTeam: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 2,
      inProgress: true,
    });
  });

  it('Verifica se termina uma partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.have.equal('Finished');
  });

  it('Verifica se os times são diferentes', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 1,
        awayTeam: 1,
        homeTeamGoals: 1,
        awayTeamGoals: 2,
        inProgress: true,
      })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.have.equal({message: 'It is not possible to create a match with two equal teams'});
  });

  it('Verifica se os times existem', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 3289173672,
        awayTeam: 13123214123412,
        homeTeamGoals: 1,
        awayTeamGoals: 2,
        inProgress: true,
      })

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.have.equal({message:'There is no team with such id!'});
  });

  it('Verifica se atualiza partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches')
      .send({
        homeTeamGoals: 10,
        awayTeamGoals: 20,
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.have.equal({ message: 'Updated' });
  });
});

