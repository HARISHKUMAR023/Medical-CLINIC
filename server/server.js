const winston = require('winston');
const stream = require('stream');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

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

const logger = require('./loger'); 

const app = express();
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
// app.use((req, res, next) => {
//   const ip = req.ip;
//   const url = req.originalUrl;
//   const method = req.method;
//   const logMessage = `IP: ${ip}, Method: ${method}, URL: ${url}`;
//   logger.error(logMessage);
//   next();
// });

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


// app.use(errorMiddleware);
// const logData = [];
// const writableStream = new stream.Writable({
//   write: function(chunk, encoding, next) {
//     logData.push(JSON.parse(chunk));
//     next();
//   }
// });

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//     new winston.transports.File({ filename: 'combined.log' }),
//     new winston.transports.Stream({
//       stream: writableStream,
//     }),
//   ],
// });
app.get('/logs', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const logInterval = setInterval(() => {
    if (logData.length > 0) {
      const log = logData.shift();
      res.write(`data: ${JSON.stringify(log)}\n\n`);
    }
  }, 1000);

  req.on('close', () => {
    clearInterval(logInterval);
  });
});
// app.get('/logs', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');

//   // Dummy example: Stream server-side logs every second
//   const serverLogInterval = setInterval(() => {
//     const serverLog = `Server log message - ${new Date().toISOString()}\n`;
//     res.write(`data: ${serverLog}\n\n`);
//   }, 1000);

//   // Dummy example: Stream client-side logs every two seconds
//   const clientLogInterval = setInterval(() => {
//     const clientLog = `Client log message - ${new Date().toISOString()}\n`;
//     res.write(`data: ${clientLog}\n\n`);
//   }, 2000);

//   // Close SSE connection when the client disconnects
//   req.on('close', () => {
//     clearInterval(serverLogInterval);
//     clearInterval(clientLogInterval);
//     console.log('Client disconnected from SSE');
//   });
// });
// app.use(logRequest('info'));
// app.use(logRequest('warning'))
// app.use(logRequest('error'))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

