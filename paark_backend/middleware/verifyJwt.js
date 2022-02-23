const jwt = require("jsonwebtoken");
const _ = require("lodash");

const verifyJwt = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        return res.status(400).json({
          isAuth: false,
          message: "Requête non authentifiée",
        });
      }
      req.user = _.pick(decoded, ["id", "email"]);
      next();
    });
  } else {
    return res.end();
  }
};
module.exports = { verifyJwt };
