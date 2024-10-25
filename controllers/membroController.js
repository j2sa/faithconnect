const Membro = require('../models/membro');

exports.cadastrarMembro = async (req, res) => {
  try {
    const membro = new Membro(req.body);
    await membro.save();
    res.status(201).send(membro);
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
};

exports.atualizarMembro = async (req, res) => {
  try {
    const membro = await Membro.findByIdAndUpdate((), req.body, { new: true });
    res.send(membro);
  } catch (err) {
    res.status(404).send({ erro: 'Membro não encontrado' });
  }
};