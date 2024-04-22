const frisby = require('frisby');

const url = 'http://localhost:3001';

describe('3 - Adicione as validações para o endpoint /login', () => {

  it('Deve validar que não é possível fazer login sem o campo "email"', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          password: '12345678',
        },
      })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('O campo "email" é obrigatório');
      });
  });

  it('Deve validar que não é possível fazer login sem um email no formato "email@email.com"', async () => {
    const invalidEmails = ['meu email', '@.com','a@a','teste@com'] 
    for (let i = 0; i < invalidEmails.length; i++) {
      const invalidEmail = invalidEmails[i];
      await frisby
      .post(`${url}/login`, {
          body: {
            email: invalidEmail,
            password: '12345678',
          },
        })
        .expect('status', 400)
        .then((responseLogin) => {
          const { body } = responseLogin;
          const result = JSON.parse(body);
          expect(result.message).toBe(
            'O "email" deve ter o formato "email@email.com"',
          );
        });
      
    }
  });

  it('Deve validar que não é possível fazer login sem o campo "password"', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
        },
      })
      .expect('status', 400)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        expect(result.message).toBe('O campo "password" é obrigatório');
      });
    });
    
    it('Deve validar que não é possível fazer login com o campo "password" menor que 8 caracteres', async () => {
      await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
          password: '42',
        },
      })
      .expect('status', 400)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        expect(result.message).toBe(
          'O "password" deve ter pelo menos 8 caracteres',
        );
      });
    });
    it('Deve validar que não é possível fazer login com email incorreto', async () => {
      await frisby
        .post(`${url}/login`, {
          body: {
            email: 'a@example.com',
            password: '12345678',
          },
        })
        .expect('status', 401)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('Email ou senha incorretos');
        });
    });
    it('Deve validar que não é possível fazer login com senha incorreta', async () => {
      await frisby
        .post(`${url}/login`, {
          body: {
            email: 'cristina.oliveira@example.com',
            password: '123456789101145',
          },
        })
        .expect('status', 401)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('Email ou senha incorretos');
        });
    });
    it('Deve validar que é possível fazer login', async () => {
      await frisby
        .post(`${url}/login`, {
          body: {
            email: 'cristina.oliveira@example.com',
            password: '12345678',
          },
        })
        .expect('status', 200)
        .then((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.message).toBe('Login realizado com sucesso');
        });
    });
   
});
