const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const membrosRouter = require('./routes/membros');
const usersRouter = require('./routes/users');
const publicRoutes = require('./routes/publicRoutes');
const auth = require('./middleware/auth');
const axios = require('axios');
const https = require('https').createServer;
const fs = require('fs');

dotenv.config({ path: '../.env' });

const app = express();

const port = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Erro MongoDB Connect:' + err));

app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/api/membros', membrosRouter);
app.use('/api', usersRouter);
app.use('/api', publicRoutes);

app.use('/api', (req, res, next) => {
  if (req.path === '/register' || req.path === '/login') {
    return next();
  }
  auth(req, res, next);
});

app.get('/', (req, res) => {
  res.send('ChurchHub API');
});

const server = https({
  key: fs.readFileSync('/etc/letsencrypt/live/api.churchhub.app.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.churchhub.app.br/fullchain.pem'),
}, app);

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;