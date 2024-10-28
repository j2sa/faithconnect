const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const membrosRouter = require('./routes/membros');
const usersRouter = require('./routes/users');
const auth = require('./middleware/auth'); // Middleware de autenticação

dotenv.config({ path: '../.env' });
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(cors()); // Usar cors

// Aplicar o middleware globalmente, exceto nas rotas de registro e login
app.use('/api', (req, res, next) => {
  if (req.path === '/register' || req.path === '/login') {
    return next();
  }
  auth(req, res, next);
});

app.get('/', (req, res) => {
  res.send('ChurchHub API');
});

app.use('/api/membros', membrosRouter);
app.use('/api', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
