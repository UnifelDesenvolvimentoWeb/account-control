const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'users.json');
const SEED_FILE = path.join(__dirname, 'seed.json');

const route = path.resolve(__dirname, '../src/users.json');

const url = 'http://localhost:3001';

describe('4 - Crie o endpoint POST /users', () => {
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

  it('Deve validar que não é possível cadastrar um usuário sem nome', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email.user@gmail.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .setup({
            request: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/users`, {
            age: 26,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).toBe('O campo "name" é obrigatório');
          });
      });
  });

  it('Deve validar que não é possível cadastrar um usuário com nome menor que 3 caracteres', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .setup({
            request: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/users`, {
            name: 'Ma',
            age: 26,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).toBe(
              'O "name" deve ter pelo menos 3 caracteres',
            );
          });
      });
  });

  it('Deve validar que não é possível cadastrar um usuário sem idade', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .post(`${url}/users`, {
            name: 'Maria Cardoso',
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).toBe('O campo "age" é obrigatório');
          });
      });
  });

  it('Deve validar que não é possível cadastrar um usuário com idade menor de 18 anos', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .post(`${url}/users`, {
            name: 'Maria Cardoso',
            age: 17,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(81) 7415-8562', city: 'Recife' },
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).toBe(
              'O usuário deve ser maior de idade',
            );
          });
      });
  });

  it('Deve validar que não é possível cadastrar um usuário sem o campo info', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .setup({
            request: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/users`, {
            name: 'Maria Cardoso',
            email: "email@email.com",
            password: '12345678',
            age: 59,
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).toBe(
              'O campo "info" é obrigatório',
            );
          });
      });
  });

  it('Deve validar que não é possível cadastrar um usuário sem a chave city', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .setup({
            request: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/users`, {
            name: 'Maria Cardoso',
            age: 24,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(81) 7415-8562' },
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).toBe(
              'O campo "city" é obrigatório',
            );
          });
      });
  });

  it('Deve validar que não é possível cadastrar um usuário sem a chave phoneNumber', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .setup({
            request: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/users`, {
            name: 'Maria Cardoso',
            age: 26,
            email: "email@email.com",
            password: '12345678',
            info: { city: 'Recife' },
          })
          .expect('status', 400)
          .then((response) => {
            const { json } = response;
            expect(json.message).toBe(
              'O campo "phoneNumber" é obrigatório',
            );
          });
      });
  });
  
  it('Deve validar que é possível cadastrar um usuário com sucesso', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .setup({
            request: {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/users`, {
            name: 'Maria Cardoso',
            age: 26,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(81) 7415-8562', city: 'Recife' },
          })
          .expect('status', 201)
          .then(async (response) => {
            const data = await fs.promises.readFile(route, 'utf-8');
            const users = JSON.parse(data);
          
            const user = users.find((pers) => pers.id === 8);
            expect(require(FILE)).toEqual(
              expect.arrayContaining([expect.objectContaining(user)]),
            );
            const { json } = response;
            expect(json).toEqual(user);
          });
      });
  });
});
