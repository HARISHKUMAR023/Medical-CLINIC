const logger = require('../loger')
function logRequest(level) {
    return function(req, res, next) {
      const ip = req.ip;
      const url = req.originalUrl;
      const method = req.method;
      const message = req.body.message; // Extract the message from the request body
  
      // Use the appropriate logging function for each level
      if (level === 'info') {
        logger.info(message, { ip, method, url });
      } else if (level === 'warn') {
        logger.warn(message, { ip, method, url });
      } else if (level === 'error') {
        logger.error(message, { ip, method, url });
      }
  
      // Send the log details in the response
      res.send({ level, message, ip, method, url });
      next();
    }
  }
  
  module.exports = logRequest;