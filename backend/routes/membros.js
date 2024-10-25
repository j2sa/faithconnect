const express = require('express');
const router = express.Router();
const Membro = require('../models/Membro');
const auth = require('../middleware/auth'); // Adicione a linha do middleware

// Criar um novo membro
router.post('/', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const newMembro = new Membro({
      ...req.body,
      userId: req.user.userId, // Associar o userId ao membro
      igrejaId: req.user.igrejaId // Associar o igrejaId ao membro
    });
    await newMembro.save();
    res.status(201).send(newMembro);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ler todos os membros
router.get('/', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const membros = await Membro.find({ igrejaId: req.user.igrejaId }); // Filtrar por igrejaId
    console.log('Membros encontrados:', membros);
    const membrosComDatas = membros.map(membro => {
      console.log('Processando membro:', membro);
      return {
        id: membro._id,
        nome: membro.nome,
        endereco: membro.endereco,
        data_nascimento: membro.getAniversario(),
        contato: membro.contato,
        data_entrada: membro.data_entrada,
        tempo_de_membresia: membro.getTempoDeMembresia(),
        status: membro.status,
        motivo_inatividade: membro.status === 'inativo' ? membro.motivo_inatividade : null
      };
    });
    res.status(200).send(membrosComDatas);
  } catch (error) {
    console.error('Erro ao buscar membros:', error);
    res.status(500).send(error);
  }
});

// Ler um membro específico
router.get('/:id', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const membro = await Membro.findById(req.params.id);
    if (!membro) {
      return res.status(404).send();
    }
    res.status(200).send(membro);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Atualizar um membro
router.patch('/:id', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const membro = await Membro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!membro) {
      return res.status(404).send();
    }
    res.status(200).send(membro);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Excluir um membro
router.delete('/:id', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const membro = await Membro.findByIdAndDelete(req.params.id);
    if (!membro) {
      return res.status(404).send();
    }
    res.status(200).send(membro);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Relatório - Total de Membros
router.get('/relatorios/total-membros', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const totalAtivos = await Membro.countDocuments({ status: 'ativo', igrejaId: req.user.igrejaId }); // Filtrar por igrejaId
    const totalInativos = await Membro.countDocuments({ status: 'inativo', igrejaId: req.user.igrejaId }); // Filtrar por igrejaId
    res.status(200).send({ totalAtivos, totalInativos });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Relatório - Motivos de Inatividade
router.get('/relatorios/motivos-inatividade', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const motivosInatividade = await Membro.aggregate([
      { $match: { status: 'inativo', igrejaId: req.user.igrejaId } }, // Filtrar por igrejaId
      { $group: { _id: '$motivo_inatividade', count: { $sum: 1 } } }
    ]);
    res.status(200).send(motivosInatividade);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Relatório - Próximos Aniversários
router.get('/relatorios/proximos-aniversarios', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const hoje = new Date();
    const seteDiasDepois = new Date(hoje);
    seteDiasDepois.setDate(hoje.getDate() + 7);

    const proximosAniversarios = await Membro.find({
      status: 'ativo',
      igrejaId: req.user.igrejaId // Filtrar por igrejaId
    }).select('nome data_nascimento');

    const aniversariantesComIdade = proximosAniversarios.filter(membro => {
      const aniversario = new Date(membro.data_nascimento);
      aniversario.setFullYear(hoje.getFullYear()); // Considerar apenas mês e dia

      const dif = (aniversario - hoje) / (1000 * 60 * 60 * 24); // Diferença em dias
      return dif >= 0 && dif <= 7; // Filtrar aniversariantes nos próximos 7 dias
    }).map(membro => {
      const aniversario = new Date(membro.data_nascimento);
      const idade = hoje.getFullYear() - aniversario.getFullYear();
      return {
        nome: membro.nome,
        data_nascimento: membro.data_nascimento,
        idade: idade
      };
    });

    res.status(200).send(aniversariantesComIdade);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
