const express = require('express');
const router = express.Router();
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

module.exports = router;