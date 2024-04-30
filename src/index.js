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

app.get('/users', async (_request, response) => {
  try {
    const usersData = await fs.readFile(route, 'utf8');
    const users = JSON.parse(usersData);

    if (users.length === 0) {
      response.status(200).json([]);
    } else {
      response.status(200).json(users);
    }
  } catch (error) {
    response.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

app.listen('3001', () => {
  console.log('Online');
});
