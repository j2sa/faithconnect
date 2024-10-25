const mongoose = require('mongoose');

const membroSchema = new mongoose.Schema({
  nome: String,
  dataNascimento: Date,
  endereco: String,
  telefone: String,
  email: String,
  relacionamentos: [
    {
      tipo: String,
      membroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Membro' }
    }
  ]
});

const Membro = mongoose.model('Membro', membroSchema);

module.exports = Membro;