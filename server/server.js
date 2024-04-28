const winston = require("winston");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const pinoHttp = require('pino-http');
const http = require('http');
const socketIo = require('socket.io');
const pino = require("pino");
const rolsRoutes = require('./routes/rols.routes')
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.routes');
const FinancialYearControllers = require('./routes/FinancialYear.routes');
const manufacturerController = require('./routes/manufacturer.routes')
const Product = require('./routes/Product.routes');
const Paymenttype = require('./routes/paymenttype.routes')
const supplierRoutes = require('./routes/suppliers.routes');
const PatientRoutes = require('./routes/Patient.routes') 
const PurchaseRoutes = require('./routes/Purchase.routes');
const Productitem = require('./routes/Productitem.routes');
const billingRoutes = require('./routes/billing.routes');
const logRequest = require('./middlewares/logrequset');
const Log = require('./models/Log.models');
const { setIo } = require('./loger');

// const logger = require('./loger'); 
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // allow to connect from any origin
    methods: ["GET", "POST"], // allowed methods
    allowedHeaders: ["my-custom-header"], // allowed headers
    credentials: true
  }
});
setIo(io);
// used pino logger
// app.use(logger);
// logger use pino logger
const logger = pino()

require('dotenv').config();
const port = process.env.PORT || 5000;
const Databaseurl = process.env.MONGO_URI
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads/profiles')));
app.use('/uploads/productfile', express.static(path.join(__dirname, 'uploads/productfile')));
app.use('/uploads/manufacturerfile', express.static(path.join(__dirname, 'uploads/manufacturerfile')));




const mongoUri =  Databaseurl;

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const corsOptions = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());


app.use('/api/', userRoutes);
app.use('/api/', authRoutes);
app.use('/api/',rolsRoutes)
app.use('/api/',FinancialYearControllers)
app.use('/api/',Product)
app.use('/api/', manufacturerController)
app.use('/api/',Paymenttype)
app.use('/api', supplierRoutes);
app.use('/api', PatientRoutes);
app.use('/api', PurchaseRoutes);
app.use('/api', Productitem);
app.use('/api', billingRoutes);
// app.use('/api',loggerroutes);


const emitLog = (level, message) => {
  logger[level](message);
  io.sockets.emit('log', message);
};



io.on('connection', (socket) => {
  const message = 'New client connected';
  // emitLog('info', message);
  socket.on('disconnect', () => {
    const message = 'Client disconnected';
    console.log(message);
    // emitLog('info', message);
  });
});
// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// app.listen(port, () => {
//   logger.info(`Server listening on port ${port}`);
//   console.log(`Server listening on port ${port}`);
// });
server.listen(5000, () => {
  logger.info(`Server listening on port ${port}`);
  console.log('Server listening on port 5000');
});

