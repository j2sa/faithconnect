const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Church = require('../models/Church');

// Rota para registrar um novo usuário e uma nova igreja
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha, igreja } = req.body;
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
    const user = await User.findOne({ email }).populate('igrejaId');
    if (!user) {
      return res.status(400).send('Usuário não encontrado');
    }
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(400).send('Senha incorreta');
    }
    const token = jwt.sign({ userId: user._id, igrejaId: user.igrejaId._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
