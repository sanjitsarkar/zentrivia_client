const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};
module.exports = authenticateToken;
