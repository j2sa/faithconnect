const mongoose = require('mongoose');

const MembroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
  sexo: { 
    type: String,
    enum: ['masculino', 'feminino'] 
  },
  cep: { type: String, required: true },
  endereco: { type: String},
  numero: { type: String},
  complemento: { type: String },
  bairro: { type: String },
  cidade: { type: String },
  estado: { type: String },  
  email: { type: String },
  telefone: { type: String, required: true },
  data_batismo: { type: Date },
  status: { 
    type: String, 
    enum: ['ativo', 'inativo'], 
    default: 'ativo' 
  },
  motivo_inatividade: { 
    type: String, 
    enum: ['falecimento', 'transferencia', 'outro'], 
    required: function() { return this.status === 'inativo'; } 
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
  const dataBatismo = new Date(this.data_batismo);
  const hoje = new Date();
  const anosDeMembresia = hoje.getFullYear() - dataBatismo.getFullYear();
  return anosDeMembresia;
};

const Membro = mongoose.model('Membro', MembroSchema);

module.exports = Membro;
