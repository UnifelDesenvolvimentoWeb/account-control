const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:3001';
const FILE = path.join(__dirname, '..', 'src', 'users.json');
const SEED_FILE = path.join(__dirname, 'seed.json');

describe('5 - Crie o endpoint PUT /users/:id', () => {
  beforeEach(() => {
    const usersMock = fs.readFileSync(
      SEED_FILE,
      'utf8',
    );

    fs.writeFileSync(
      FILE,
      usersMock,
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

  it('Deve validar que não é possível editar um usuário sem nome', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            age: 24,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe('O campo "name" é obrigatório');
          });
      });
  });

  it('Deve validar que não é possível editar um usuário com nome menor que 3 caracteres', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then((responseLogin) => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Ma',
            age: 26,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O "name" deve ter pelo menos 3 caracteres',
            );
          });
      });
  });

  it('Deve validar que não é possível editar um usuário sem idade', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Maria Cardoso',
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe('O campo "age" é obrigatório');
          });
      });
  });

  it('Deve validar que não é possível editar um usuário com idade menor de 18 anos', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Maria Cardoso',
            age: 16,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O usuário deve ser maior de idade',
            );
          });
      });
  });

  it('Deve validar que não é possível editar um usuário sem o campo info', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Maria Cardoso',
            age: 26,
            email: "email@email.com",
            password: '12345678',
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "info" é obrigatório',
            );
          });
      });
  });

  it('Deve validar que não é possível editar um usuário sem a chave city', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Maria Cardoso',
            age: 26,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562' },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "city" é obrigatório',
            );
          });
      });
  });

  it('Deve validar que não é possível editar um usuário sem a chave phoneNumber', async () => {
    let resultUsers;

    await frisby
        .post(`${url}/users`, {
          name: 'Maria Cardoso',
          age: 26,
          email: "email@email.com",
          password: '12345678',
          info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
        })
        .expect('status', 201)
        .then((responseCreate) => {
          const { body } = responseCreate;
          resultUsers = JSON.parse(body);
        });

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'email@email.com',
          password: '12345678',
        },
      })
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Maria Cardoso',
            age: 26,
            email: "email@email.com",
            password: '12345678',
            info: { city: 'Salvador' },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "phoneNumber" é obrigatório',
            );
          });
      });
  });

  it('Deve validar que são retornados os dados do usuário editado com sucesso', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        email: 'email@email.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Maria Andrade',
            age: 30,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
          })
          .expect('status', 200)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.id).toBe(resultUsers.id);
            expect(json.name).toBe('Maria Andrade');
            expect(json.age).toBe(30);
            expect(json.info.phoneNumber).toBe('(71) 7415-8562');
            expect(json.info.city).toBe('Salvador');
          });
      });
  });

  it('Deve validar que os dados atualizados do usuário sejam persistidos', async () => {
    let resultUsers;

    await frisby
      .post(`${url}/users`, {
        name: 'Maria Cardoso',
        age: 26,
        email: "email@email.com",
        password: '12345678',
        info: { phoneNumber: '(71) 7415-8562', city: 'Salvador' },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { body } = responseCreate;
        resultUsers = JSON.parse(body);
      });

    await frisby
      .post(`${url}/login`, {
        email: 'email@email.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then(() => {
        return frisby
          .put(`${url}/users/${resultUsers.id}`, {
            name: 'Maria',
            age: 32,
            email: "email@email.com",
            password: '12345678',
            info: { phoneNumber: '(71) 7415-8523', city: 'Salvador' },
          })
          .expect('status', 200)
          .then(() => {
            expect(require(FILE)).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  id: resultUsers.id,
                  name: 'Maria',
                  age: 32,
                  info: {
                    phoneNumber: '(71) 7415-8523',
                    city: 'Salvador',
                  },
                }),
              ]),
            );
          });
      });
  });
});
