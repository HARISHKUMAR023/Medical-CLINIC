const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes for a 256-bit key
};

const secretKey = generateSecretKey();
console.log('Generated Secret Key:', secretKey);
