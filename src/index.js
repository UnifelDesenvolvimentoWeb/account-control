const express = require('express');
const fs = require('fs').promises
const path = require('path');
const bodyParser = require ('body-parser');

const app = express();
const route = path.resolve('./src/users.json');
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.get('/users', async (_req, res) => {
  const users = await fs.readFile(route, 'UTF-8')

  return res.status(200).json(JSON.parse(users))
});

module.exports = app;