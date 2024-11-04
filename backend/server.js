const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const membrosRouter = require('./routes/membros');
const usersRouter = require('./routes/users');
const auth = require('./middleware/auth');
const axios = require('axios');

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.BACKEND_PORT;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://" + process.env.DOMAIN_NAME + ":3000", // Permitir a origem específica do frontend
  credentials: true, // Permitir envio de cookies
};
app.use(cors(corsOptions)); // Usar CORS com as opções configuradas
app.use(cookieParser()); // Usar cookie-parser

app.use('/api', (req, res, next) => {
  if (req.path === '/register' || req.path === '/login') {
    return next();
  }
  auth(req, res, next);
});

app.get('/', (req, res) => {
  res.send('ChurchHub API');
});

// Add a new route for fetching CEP data
app.get('/api/cep/:cep', async (req, res) => {
  const { cep } = req.params;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    res.json({
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch CEP data' });
  }
});

app.use('/api/membros', membrosRouter);
app.use('/api', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
