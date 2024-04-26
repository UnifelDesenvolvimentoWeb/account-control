const express = require('express');
const bodyParser = require('body-parser');
const {validEmail, validPassword, validName, validAge, validInfo} = require('./middlewares');
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

	let usersPath = path.join(CWD, '/src/users.json');
	let users = await fs.readFile(usersPath, 'UTF-8');
	users = JSON.parse(users);

	let user = users.find(user => user.email === email && user.password === password);
	
	if(user !== undefined) {
		res.status(200).json({message: "Login realizado com sucesso"});
	}
	else {
		res.status(401).json({message: "Email ou senha incorretos"});
	}
})

app.post('/users', validName, validEmail,validAge, validInfo, async (req, res) => {

	let user = req.body;

	let usersPath = path.join(CWD, '/src/users.json');
	let users = await fs.readFile(usersPath, 'UTF-8');
	users = JSON.parse(users);

	let id = users.length;
	users.forEach(user => {
		if(user.id === id) {id++};
	})
	user.id = id;
	users.push(user)
	
	fs.writeFile(usersPath, JSON.stringify(users));
	res.status(201).json(user);
})

app.put('/users/:id', validName, validEmail,validAge, validInfo, async (req, res) => {
	
	let {id} = req.params;
	let newUser = req.body;

	let usersPath = path.join(CWD, '/src/users.json');
	let users = await fs.readFile(usersPath, 'UTF-8');
	users = JSON.parse(users);

	newUser.id = +id;

	let oldUser = users.find((element) => element.id === +id);
	
	if(!oldUser) {
		res.status(404).json({message:"Usuário não encontrado"});
	}
	else {
		users.splice(users.indexOf(oldUser), 1);
		users.push(newUser);
		await fs.writeFile(usersPath, JSON.stringify(users));
		res.status(200).json(newUser);
	}


})