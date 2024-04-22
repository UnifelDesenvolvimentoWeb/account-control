const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:3001';
const FILE = path.join(__dirname, '..', 'src', 'users.json');
const SEED_FILE = path.join(__dirname, 'seed.json');

describe('6 - Crie o endpoint DELETE /users/:id', () => {
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
    afterAll(() => {
      fs.writeFileSync(
        FILE,
        usersSeed,
        'utf8',
      );
    });
  });

  it('Deve validar que é possível deletar um usuário com sucesso', async () => {
    let resultUsers;

    await frisby.post(`${url}/users`, {
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
          .delete(`${url}/users/${resultUsers.id}`)
          .expect('status', 204)
          .then(() => {
            expect(require('../src/users.json')).not.toEqual(
              expect.arrayContaining(
                [expect.objectContaining({ id: resultUsers.id})]
              )
            );
          });
      });
  });
  it('Deve validar que não é possível deletar um usuário', async () => {
    let resultUsers;

    await frisby.post(`${url}/users`, {
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
        password: '87654321',
      })
      .expect('status', 401)
  });
});
