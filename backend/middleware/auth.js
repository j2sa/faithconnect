const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Buscar o token nos cookies
    const token = req.cookies.accessToken;
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
