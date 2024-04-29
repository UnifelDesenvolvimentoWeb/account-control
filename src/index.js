const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises
const path = require('path');
const { request } = require('http');
const route = path.resolve(__dirname, './users.json')

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.get('/users', async (_request, response)=> {
  const users = await fs.readFile(route, 'utf-8')
  response.status(200).send(JSON.parse(users))
})

app.get('/users/:id', async (request, response)=> {
  const users = await fs.readFile(route, 'utf-8')
  const dataUsers = JSON.parse(users)
  const id = request.params.id
  const userFound = dataUsers.find((user)=> user.id === Number(id))
  if (userFound) {
   return response.status(200).json(userFound)
  }
  return response.status(404).json({"message": "Usuário não encontrado"})
})

app.listen('3001', () => {
  console.log('Online');
});
