const express = require('express');
const bodyParser = require('body-parser');
const {validEmail, validPassword, validName, validAge, validInfo} = require('./middlewares');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const CWD = process.env.PWD;
const usersPath = path.join(CWD, '/src/users.json');

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen('3001', () => {
  console.log('Online');
});

async function read() {
	return JSON.parse(await fs.readFile(usersPath, 'UTF-8'));
}

async function write(data) {
	fs.writeFile(usersPath, JSON.stringify(data));
}

app.get('/users', async (_req, res,) => {
	const users = await read();
	res.status(200).json(users);
})

app.get('/users/search', async (req, res) => {
	const searchTerm = req.query.q;
	const users = await read();

	let searchUsers = users.filter(user => user.name.includes(searchTerm));
	res.status(200).json(searchUsers);
})

app.get('/users/:id', async (req, res) => {
	const {id} = req.params;
	const users = await read();
	const user = users.find((element) => element.id === +id);

	if(!user) {
		return res.status(404).json({message:'Usuário não encontrado'});
	}

	return res.status(200).json(user);
})

app.post('/login',validEmail, validPassword, async (req, res) => {
	const {email, password} = req.body;
	const users = await read();

	const user = users.find(user => user.email === email && user.password === password);
	
	if(!user) {
		return res.status(401).json({message: "Email ou senha incorretos"});
	}
	return res.status(200).json({message: "Login realizado com sucesso"});
})

app.post('/users', validName, validEmail,validAge, validInfo, async (req, res) => {
	let user = req.body;
	let users = await read();

	user.id = users.length + 1;
	users.push(user)
	
	await write(users)
	res.status(201).json(user);
})

app.put('/users/:id', validName, validEmail,validAge, validInfo, async (req, res) => {
	const users = await read();
	const {id} = req.params;

	let newUser = req.body;
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

app.delete('/users/:id', async (req, res) => {
	const {id} = req.params;
	const users = await read();

	const updatedUsers = users.filter(user => user.id !== +id);

	if(updatedUsers.length === users.length) {
		res.status(204).end();
	}
	else {
		await write(updatedUsers);
		res.status(204).end();
	}
})