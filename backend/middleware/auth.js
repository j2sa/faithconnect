const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Buscar o token no cabeçalho de autorização
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send('Acesso negado. Token não fornecido.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Token inválido ou expirado.');
  }
};

module.exports = auth;
