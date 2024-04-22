const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:3001';
const FILE = path.join(__dirname, '..', 'src', 'users.json');
const SEED_FILE = path.join(__dirname, 'seed.json');

describe('2 - Crie o endpoint GET /users/:id', () => {
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

  it('Deve validar que o endpoint retorna um usuário com base no id da rota', async () => {
    await frisby
      .get(`${url}/users/1`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual({
            id: 1,
            name: "Cristina Oliveira",
            email: "cristina.oliveira@example.com",
            password: "12345678",
            age: 25,
            info: {
              city: "Salvador",
              phoneNumber: "(71) 73265-0285"
            },
            accessDate: {
              registrationDate: "2023-08-15T11:20:31.665Z",
              lastAccess: "2024-04-18T02:15:25.665Z"
            }
      });
      });
  });

  it('Deve validar que o endpoint retonar um erro caso nenhum usuário seja encontrado', async () => {
    await frisby
      .get(`${url}/users/9`)
      .expect('status', 404)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json.message).toBe('Usuário não encontrado');
      });
  });
});
