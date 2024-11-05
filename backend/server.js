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

dotenv.config({ path: '.env' });

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

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