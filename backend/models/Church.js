const mongoose = require('mongoose');

const ChurchSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  numero: { type: String },
  complemento: { type: String },
  cidade: { type: String },
  estado: { type: String },
  pais: { type: String },
  cep: { type: String },
  cnpj: { type: String }
});

const Church = mongoose.model('Church', ChurchSchema);

module.exports = Church;
