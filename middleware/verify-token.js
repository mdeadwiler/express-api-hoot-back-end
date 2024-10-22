const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorizeation.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //assign decoded payload to req.user
    req.user = decoded;
    // call next() to invoke the next middleware function
    next();
  } catch (error) {
    // if errors then send back a 401 'Invalid token.' error
    res.status(401).json({ error: "Invalid token." });
  }
}

//export verifyToken
module.exports = verifyToken;
