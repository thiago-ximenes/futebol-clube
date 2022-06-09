import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { loginMock } from './mocks/loginMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Rota login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(loginMock as Users);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se é possível fazer login', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Verifica se ao tentar fazer login com um email incorreto recebe mensagem e status corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('Verifica se ao tentar fazer login com uma senha incorreta recebe mensagem e status corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3HxtLjKPEZBu.PW',
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('Verifica se ao tentar fazer login sem email recebe mensagem e status corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Verifica se ao tentar fazer login sem senha recebe mensagem e status corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '',
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Verifica se ao fornecer o token é mostrado para qual tipo do usuário dono do token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSJ9LCJpYXQiOjE2NTQ2ODg3NTIsImV4cCI6MTY1NTI5MzU1Mn0.hxB36apJvfV-JHb0nDdF4XGZ7uKxfVVgSQK30mRwrrg')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal('user');
  });
});
