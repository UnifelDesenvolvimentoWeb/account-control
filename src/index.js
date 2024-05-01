const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();

const route = path.resolve(__dirname, '../src/users.json');

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

async function readUsersData() {
  const usersData = await fs.readFile(route, 'utf8');
  return JSON.parse(usersData);
}

// Rota para obter todos os usuários
app.get('/users', async (_request, response) => {
  try {
    const users = await readUsersData();

    if (users.length === 0) {
      response.status(200).json([]);
    } else {
      response.status(200).json(users);
    }
  } catch (error) {
    response.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

// Rota para obter um usuário específico
app.get('/users/:id', async (request, response) => {
  try {
    const users = await readUsersData();
    const userId = parseInt(request.params.id);

    const user = users.find((user) => user.id === userId);

    if (!user) {
      response.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      response.status(200).json(user);
    }
  } catch (error) {
    response.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});


app.listen('3001', () => {
  console.log('Online');
});
