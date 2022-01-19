const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    id: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports = generateJWT;
