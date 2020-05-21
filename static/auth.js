const jwt = require("jsonwebtoken");


function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (ex) {
    return null;
  }
}


function generateJWT(_id, email, username) {
  const token = jwt.sign({ _id, email, username }, process.env.JWT_SECRET);
  return token;
}


module.exports = {verifyJWT, generateJWT};