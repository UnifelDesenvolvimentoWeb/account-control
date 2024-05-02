const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const {
  validateLogin,
  validateCreateUser,
  validateUserInput,
} = require('./middleware');

const app = express();

const route = path.resolve(__dirname, '../src/users.json');

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.status(200).send();
});

async function readUsersData() {
  const usersData = await fs.readFile(route, 'utf8');
  return JSON.parse(usersData);
}

// Endpoint para obter todos os usuários
app.get('/users', async (_req, res) => {
  try {
    const users = await readUsersData();

    if (users.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

// Endpoint para obter um usuário específico
app.get('/users/:id', async (req, res) => {
  try {
    const users = await readUsersData();
    const userId = parseInt(req.params.id);

    const user = users.find((user) => user.id === userId);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

// Endpoint para para validar login
app.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await readUsersData();
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

// Endpoint para adicionar um novo usuário
app.post('/users', validateCreateUser, async (req, res) => {
  const { name, email, password, age, info } = req.body;

  try {
    const users = await readUsersData();
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      age,
      info,
    };

    users.push(newUser);
    await fs.writeFile(route, JSON.stringify(users, null, 2));

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

// Endpoint para editar um usuário existente
app.put('/users/:id', validateUserInput, async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, password, age, info } = req.body;

  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ message: 'O ID do usuário deve ser um número válido' });
  }

  try {
    const users = await readUsersData();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      password,
      age,
      info,
    };

    await fs.writeFile(route, JSON.stringify(users, null, 2));

    return res.status(200).json(users[userIndex]);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

app.listen('3001', () => {
  console.log('Online');
});
