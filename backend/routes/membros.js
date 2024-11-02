const express = require('express');
const router = express.Router();
const Membro = require('../models/Membro');
const auth = require('../middleware/auth'); // Adicione a linha do middleware

// Criar um novo membro
router.post('/', auth, async (req, res) => {
  try {
    const membros = req.body; // Assumir que req.body é um array de membros

    const newMembros = await Promise.all(membros.map(async membro => {
      const newMembro = new Membro({
        ...membro,
        userId: req.user.userId, // Associar o userId ao membro
        igrejaId: req.user.igrejaId, // Associar o igrejaId ao membro
        conjuge: req.user.conjuge, // Associar o conjuge ao membro
        filhos: req.user.filhos // Associar os filhos ao membro
      });
      await newMembro.save();
      return newMembro;
    }));

    res.status(201).send(newMembros);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ler todos os membros
router.get('/', auth, async (req, res) => {  // Adicionar auth para proteger a rota
  try {
    const membros = await Membro.find({ igrejaId: req.user.igrejaId }); // Filtrar por igrejaId
    res.status(200).send(membros);
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
router.get('/relatorios/proximos-aniversarios', auth, async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Set to start of the day

    const diasDepois = new Date(hoje);
    diasDepois.setDate(hoje.getDate() + 7);
    diasDepois.setHours(23, 59, 59, 999); // Set to end of the day

    const proximosAniversarios = await Membro.find({
      status: 'ativo',
      igrejaId: req.user.igrejaId,
      $expr: {
        $and: [
          {
            $gte: [
              {
                $dateFromParts: {
                  month: { $month: "$data_nascimento" },
                  day: { $dayOfMonth: "$data_nascimento" },
                  year: hoje.getFullYear()
                }
              },
              { $dateFromParts: { year: hoje.getFullYear(), month: 11, day: 2 } }
            ]
          },
          {
            $lte: [
              {
                $dateFromParts: {
                  month: { $month: "$data_nascimento" },
                  day: { $dayOfMonth: "$data_nascimento" },
                  year: hoje.getFullYear()
                }
              },
              { $dateFromParts: { year: hoje.getFullYear(), month: 11, day: 9 } }
            ]
          }
        ]
      }
    }).select('nome data_nascimento _id');

    const aniversariantesComIdade = proximosAniversarios.map(membro => {
      const aniversario = new Date(membro.data_nascimento);
      const idade = hoje.getFullYear() - aniversario.getFullYear();
      return {
        id: membro._id,
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
