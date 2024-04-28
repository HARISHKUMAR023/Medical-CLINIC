const User = require('../models/User.model'); // Replace with your user model path
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const RolePermission = require('../models/roles.model');
// const logger = require('../loger');
const logRequest = require('../middlewares/logrequset'); // Import the logRequest middleware
// logger.error('This is an error message');
// const pinohttp = require('pino-http')()
// const loggerpino = require('pino')
const pino = require("pino");
const logger = pino()
const { emitLog } = require('../loger');
const login = async (req, res) => {

 
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user){ 
      emitLog('error', 'user not found');
// logger.error('Invalid username or password')
      // req.log.info({
      //   ip: req.ip,
      //   method: req.method,
      //   statusCode: 401, // Status code will be 401 if user is not found
      //   type: 'info'
      // }, 'Invalid username or password');
      return res.status(401).json({ message: 'Invalid username or password' });}

    // Check if user account is active
    if (!user.active) {
      emitLog('info', 'Account is deactivated, kindly contact admin');
      return res.status(403).json({ message: 'Account is deactivated, kindly contact admin' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid username or password' });
    if (!user.roles || user.roles.length === 0) {
      
      throw new Error('User type not assigned');
    }
    const userTypeDetails = await RolePermission.findById(user.roles[0]);
    if (!userTypeDetails) {
      throw new Error('User type not found');
    }

    // Generate and sign JWT with user data and roles
    const token = generateJwtToken(user.id, user.email, user.roles,);
    emitLog('info', 'User logged in');
    res.json({
       name:user.name,
        email, token, 
        roles: {
          id: userTypeDetails._id,
          role: userTypeDetails.role,
          permissions: userTypeDetails.permissions,
        }, });

  } catch (err) {
    console.error(err);
    emitLog('error', 'User logged in');
    res.status(500).json({ message: 'Server error' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token' });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); // Use a separate secret key for refresh tokens
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateJwtToken(user.id, user.name, user.roles, user.email); // Generate a new access token

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

function generateJwtToken(userId, name, email, roles) {
  const payload = { userId, name,email, roles };
  const secretKey ="aecc69d803d1be1655fabe7d6fd40ded50a130376fedd09ee7e83e3620e67bde"; // Replace with your secret key from environment variables

  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set appropriate expiration time
}

module.exports ={ generateJwtToken ,login ,refreshToken  };
