const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
require('dotenv').config();
const databaseUrl = process.env.MONGO_URI;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.MongoDB({ db: databaseUrl, collection: 'logs', meta: true ,level: 'info' ,options: { useUnifiedTopology: true }})
  ]
});

module.exports = logger;