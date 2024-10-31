const mongoose = require('mongoose');

const MembroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
  contato: { type: String, required: true },
  data_entrada: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['ativo', 'inativo'], 
    default: 'ativo' 
  },
  motivo_inatividade: { 
    type: String, 
    enum: ['falecimento', 'outra_igreja', 'outro'], 
    required: function() { return this.status === 'inativo'; } 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  igrejaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Church', 
    required: true 
  },
  conjuge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membro'
  },
  filhos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membro'
  }]
});

MembroSchema.methods.getAniversario = function() {
  const dataNascimento = new Date(this.data_nascimento);
  return `${dataNascimento.getDate()}/${dataNascimento.getMonth() + 1}`;
};

MembroSchema.methods.getTempoDeMembresia = function() {
  const dataEntrada = new Date(this.data_entrada);
  const hoje = new Date();
  const anosDeMembresia = hoje.getFullYear() - dataEntrada.getFullYear();
  return anosDeMembresia;
};

const Membro = mongoose.model('Membro', MembroSchema);

module.exports = Membro;
