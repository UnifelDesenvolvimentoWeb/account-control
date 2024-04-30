const express = require('express');
const { validateEmail, validatePassword } = require('./middlewares')
const fs = require('fs').promises
const path = require('path');
const bodyParser = require ('body-parser');

const app = express();
const route = path.resolve('./src/users.json');
app.use(bodyParser.json());
app.use(express.json())

app.get('/', (_request, response) => {
  response.status(200).send();
});

//requisito 01
app.get('/users', async (_req, res) => {
  const users = await fs.readFile(route, 'UTF-8')

  return res.status(200).json(JSON.parse(users))
});

//requisito 02
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const users = await fs.readFile(route, 'UTF-8');
  const updUsers = JSON.parse(users)

  const user = updUsers.find((user) => user.id === +id);
  if (!user) {
    return res.status(404).json({message: 'Usuário não encontrado'})
  }

  return res.status(200).json(user)
});

//requisito 03
app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const {email, password} = req.body
  const users = await fs.readFile(route, 'UTF-8');
  const updUsers = JSON.parse(users)

  const login = updUsers.find((user) => user.email === email && user.password === +password);
  if (!login) {
    return res.status(404).json({message: 'Email ou senha incorretos'})
  }

   return res.status(200).json({message: 'Login realizado com sucesso'})
})

module.exports = app;