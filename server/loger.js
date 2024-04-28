const pino = require('pino');
const logger = pino();
let io;

const setIo = (socketIo) => {
  io = socketIo;
};

const emitLog = (level, message) => {
  logger[level](message);
  if (io) {
    io.sockets.emit('log', message);
  }
};

module.exports = { emitLog, setIo };