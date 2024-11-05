const express = require('express');
const router = express.Router();
const Membro = require('../models/Membro');
const Church = require('../models/Church');
const axios = require('axios');

router.get('/cep/:cep', async (req, res) => {
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
    res.status(error.status).json({ code: error.code });
  }
});

router.post('/membro', async (req, res) => {
  try {
    const { churchId, ...membroData } = req.body;
    const church = await Church.findById(churchId);
    if (!church) {
      return res.status(404).send('Igreja não encontrada');
    }
    const newMembro = new Membro({ ...membroData, igrejaId: churchId });
    await newMembro.save();
    res.status(201).send(newMembro);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;