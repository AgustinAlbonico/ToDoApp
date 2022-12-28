const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json("No hay ningun token disponible");
  }
  jwt.verify(token, process.env.JWT_PASS, (error, decoded) => {
    if (error) {
      return res.status(501).json("token invalido");
    }
    req.user = decoded;
    return next();
  });
};

module.exports = checkAuth;
