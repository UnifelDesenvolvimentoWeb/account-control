const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises
const path = require('path')
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

app.listen('3001', () => {
  console.log('Online');
});
