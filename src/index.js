const express = require('express');
const bodyParser = require('body-parser');
const {validEmail, validPassword} = require('./middlewares');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const CWD = process.env.PWD;
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen('3001', () => {
  console.log('Online');
});

app.get('/users', async (_req, res,) => {

	let usersPath = path.join(CWD, '/src/users.json')
	let users = await fs.readFile(usersPath, 'UTF-8');
	users = JSON.parse(users)
	res.status(200).json(users)
})

app.get('/users/:id', async (req, res) => {

	let {id} = req.params;

	let usersPath = path.join(CWD, '/src/users.json');
	let user = await fs.readFile(usersPath, 'UTF-8');
	user = JSON.parse(user);
	user = user.filter((element) => element.id === +id);

	if(user[0]) {
		res.status(200).json(user[0]);
	}
	else {
		res.status(404).json({message:'Usuário não encontrado'});
	}
})

app.post('/login',validEmail, validPassword, async (req, res) => {
	
	let {email, password} = req.body;

	let usersPath = path.join(CWD, '/src/users.json')
	let users = await fs.readFile(usersPath, 'UTF-8');
	users = JSON.parse(users);

	let user = users.find(user => user.email === email && user.password === password);
	
	if(user !== undefined) {
		res.status(200).json({message: "Login realizado com sucesso"})
	}
	else {
		res.status(401).json({message: "Email ou senha incorretos"})
	}
})

