const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cargo: { type: String, required: true },
  senha: { type: String, required: true },
  igrejaId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Church'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
