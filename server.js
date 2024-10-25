require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./config/config');
const database = require('./config/database');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('FaithConnect API');
});

app.listen(config.port, () => {
  console.log(`Servidor iniciado na porta ${config.port}`);
});