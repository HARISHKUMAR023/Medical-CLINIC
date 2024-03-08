// auth.middleware.js
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
   
// auth.middleware.js (continued)
const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key

  req.user = decodedPayload; // Attach decoded user data to the request object
  next();
} catch (err) {
  console.error(err);
  res.status(401).json({ message: 'Invalid token' });
}
};

module.exports = verifyJWT;
