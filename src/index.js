const express = require('express');
const bodyParser = require('body-parser');
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

