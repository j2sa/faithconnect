const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoUri);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

module.exports = db;