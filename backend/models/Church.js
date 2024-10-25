const mongoose = require('mongoose');

const ChurchSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  numero: { type: String, required: true },
  complemento: { type: String },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  pais: { type: String, required: true },
  cep: { type: String, required: true }
});

const Church = mongoose.model('Church', ChurchSchema);

module.exports = Church;
