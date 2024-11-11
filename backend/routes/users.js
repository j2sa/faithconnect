const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Church = require('../models/Church');

// Rota para registrar um novo usuário e uma nova igreja
router.post('/register', async (req, res) => {
  try {
    const { nome, email, cargo, senha, igreja } = req.body;
    const existingChurch = await Church.findOne({ nome: igreja.nome, endereco: igreja.endereco });
    if (existingChurch) {
      return res.status(400).send('Já existe uma igreja com este nome e endereço.');
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newChurch = new Church(igreja);
    await newChurch.save();
    const newUser = new User({
      nome,
      email,
      cargo,
      senha: hashedPassword,
      igrejaId: newChurch._id
    });
    await newUser.save();
    res.status(201).send('Usuário e Igreja registrados com sucesso!');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Rota para login do usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      console.log('Email e senha são obrigatórios')
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await User.findOne({ email }).populate('igrejaId');

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const accessToken = jwt.sign({ userId: user._id, igrejaId: user.igrejaId._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    const churchId = user.igrejaId._id;

    res.status(200).json({ accessToken, refreshToken, churchId, message: 'Login bem-sucedido!' });
  } catch (error) {
    res.status(400).json({ error: error.message, statusCode: 400 });
  }
});

// Rota para renovar o token
router.post('/token', (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ userId: user.userId, igrejaId: user.igrejaId }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.cookie('accessToken', accessToken, { httpOnly: false, secure: true, maxAge: 15 * 60 * 1000 });
    res.json({ accessToken });
  });
});

module.exports = router;
