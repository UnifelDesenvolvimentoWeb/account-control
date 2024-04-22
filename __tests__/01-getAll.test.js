const frisby = require('frisby');
const fs = require('fs');
const path = require('path');
const seed = require('./seed.json');

const url = 'http://localhost:3001';
const FILE = path.join(__dirname, '..', 'src', 'users.json');
const SEED_FILE = path.join(__dirname, 'seed.json');

describe('1 - Create the endpoint GET /users', () => {
  beforeEach(() => {
    const usersSeed = fs.readFileSync(
      SEED_FILE,
      'utf8'
    );

    fs.writeFileSync(
      FILE,
      usersSeed,
      'utf8'
    );

  });

  afterAll(() => {
    const usersSeed = fs.readFileSync(
      SEED_FILE,
      'utf8'
    );
    fs.writeFileSync(
      FILE,
      usersSeed,
      'utf8',
    );
  });

  it('Deve validar que o endpoint retorna um array com todos os usuário cadastrados', async () => {
    await frisby
    .get(`${url}/users`)
    .expect('status', 200)
    .then((response) => {
      const { json } = response;
      expect(json).toEqual(seed);
    });
  });
  
  it('Deve validar que o endpoint retorna um array vazio caso não haja usuários cadastradas', async () => {
    fs.writeFileSync(FILE, '[]', 'utf8');
    
    await frisby
    .get(`${url}/users`)
    .expect('status', 200)
    .then((response) => {
        const { json } = response;
        expect(json).toEqual([]);
      });
  });
});
