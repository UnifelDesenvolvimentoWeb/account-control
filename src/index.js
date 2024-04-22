const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen('3001', () => {
  console.log('Online');
});
