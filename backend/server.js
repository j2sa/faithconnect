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

dotenv.config({ path: './.env' });

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

mongoose.connect("mongodb+srv://joelmartinez:BbOvzv05zYk1t7Xa@cluster0.6aaz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Erro MongoDB Connect:' + err));

  app.listen(() => {
    console.log('Servidor rodando');
  });

app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Permitir a origem específica do frontend
  credentials: true, // Permitir envio de cookies
};
app.use(cors(corsOptions)); // Usar CORS com as opções configuradas
app.use(cookieParser()); // Usar cookie-parser
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

module.exports = app;