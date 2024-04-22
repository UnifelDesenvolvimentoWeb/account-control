const frisby = require('frisby');
const fs = require('fs');
const path = require('path');
const seed = require('./seed.json');

const route = path.resolve(__dirname, '../src/users.json');

const url = 'http://localhost:3001';
const FILE = path.join(__dirname, '..', 'src', 'users.json');
const SEED_FILE = path.join(__dirname, 'seed.json');

describe('7 - Crie o endpoint GET /users/search?q=searchTerm', () => {
  beforeEach(() => {
    const usersSeed = fs.readFileSync(
      SEED_FILE,
      'utf8',
    );

    fs.writeFileSync(
      FILE,
      usersSeed,
      'utf8',
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

  it('Deve validar que é possível fazer uma busca por termo com sucesso', async () => {
    
    await frisby
      .post(`${url}/users`, {
          name: "Marcelo Dourado",
          email: "marcelo.dourado@example.com",
          password: "12345678",
          age: 42,
          password: '12345678',
          info: { phoneNumber: '(71) 7893-8562', city: 'Salvador' },
      })
      .expect('status', 201);
     

    await frisby
      .post(`${url}/login`, {
        email: 'marcelo.dourado@example.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then(() => {
        return frisby
          .get(`${url}/users/search?q=M`)
          .expect('status', 200)
          .then(async (responseGet) => {
            const { json } = responseGet;
            const response = await fs.promises.readFile(route, 'utf-8');
            const users = JSON.parse(response);
          
            const user = users.find((pers) => pers.id === 8);
            expect(json).toStrictEqual([
              {
                id: 4,
                name: "Marina Souza",
                email: "marina.souza@example.com",
                password: "12345678",
                age: 45,
                info: {
                  city: "Recife",
                  phoneNumber: "(81) 7569-2554"
                },
                accessDate: {
                  registrationDate: "2023-01-22T22:28:15.665Z",
                  lastAccess: "2024-02-16T14:41:28.665Z"
                }
              },
              {
                id: 6,
                name: "Maria Eduarda",
                email: "maria.eduarda@example.com",
                password: "12345678",
                age: 26,
                info: {
                  city: "Salvador",
                  phoneNumber: "(71) 7485-8565"
                },
                accessDate: {
                  registrationDate: "2023-07-20T23:10:21.665Z",
                  lastAccess: "2024-04-21T22:16:30.665Z"
                }
              },
                {
                  ...user
              }
              ]);
          });
      });
  });

  it('Deve validar que o endpoint retonará um array com todas os usuários caso "param" seja vazio', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'marcelo.dourado@example.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .get(`${url}/users/search?q`)
          .expect('status', 200)
          .then((responseGet) => {
            const { json } = responseGet;
            expect(json).toEqual(seed);
          });
      });
  });

  it('Deve validar que o endpoint retorna um array vazio caso o "param" não seja passado', async () => {
    fs.writeFileSync(FILE, '[]', 'utf8');

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'marcelo.dourado@example.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .get(`${url}/users`)
          .expect('status', 200)
          .then((responseGet) => {
            const { json } = responseGet;
            expect(json).toEqual([]);
          });
      });
  });
});
