const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises
const path = require('path');
const { request } = require('http');
const route = path.resolve(__dirname, './users.json')
const {validateEmail, validatePassword, validateName, validateAge, validateInfo} = require('./middlewares');
const { log } = require('console');

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
  let users = await fs.readFile(route, 'utf-8')
  users = JSON.parse(users)
  const {id} = request.params
  const userFound = users.find((user)=> user.id === Number(id))
  if (userFound) {
   return response.status(200).json(userFound)
  }
  return response.status(404).json({"message": "Usuário não encontrado"})
})

app.post('/login', validateEmail, validatePassword, async (request, response)=>{
  const { email, password } = request.body
  let users = await fs.readFile(route, 'utf-8')
  users = JSON.parse(users)
  let user = users.find((user)=> user.email === email && user.password === password)

  if (!user) {
    return response.status(401).json({"message": "Email ou senha incorretos"})
  }
  response.status(200).json({"message": "Login realizado com sucesso"})
})

app.post('/users', validateName, validateAge, validateInfo, async (request, response)=> {
  let users = await fs.readFile(route, 'utf-8')
  users = JSON.parse(users)
  let newUser = request.body
  let id = users.length + 1
  newUser.id = id
  users.push(newUser)

  fs.writeFile(route, JSON.stringify(users))
  response.status(201).json(newUser)
})

app.put('/users/:id', validateName, validateAge, validateInfo, async (request, response)=> {
  const {id} = request.params
  const {name, email, password, age, info } = request.body
  let users = await fs.readFile(route, 'utf-8')
  users = JSON.parse(users)
  const user = users.find((user)=> user.id === Number(id))

  if (!user) {
    return response.status(404).json({message:"Usuário não encontrado"})
  }

  user.name = name
  user.email = email
  user.password = password
  user.age = age
  user.info = info
  
  await fs.writeFile(route, JSON.stringify(users))
  response.status(200).json(user)
})

app.delete('/users/:id', async (request, response) => {

	let {id} = request.params
	let dataUsers = await fs.readFile(route, 'UTF-8')
	let users = JSON.parse(dataUsers)
  
  const index = users.findIndex((user)=> user.id === Number(id))
	
  if (index === -1) {
    return response.status(404).json({ "message": "Usuário não encontrado" })
  }
  users.splice(index, 1)
  await fs.writeFile(route, JSON.stringify(users))
  response.status(204).end()
})

app.listen('3001', () => {
  console.log('Online');
});
