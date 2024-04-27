const winston = require("winston");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


// route imports 
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
const Log = require('./models/Log.models')
// const logger = require('./loger'); 
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const Databaseurl = process.env.MONGO_URI
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads/profiles')));
app.use('/uploads/productfile', express.static(path.join(__dirname, 'uploads/productfile')));
app.use('/uploads/manufacturerfile', express.static(path.join(__dirname, 'uploads/manufacturerfile')));


class MongoDBTransport extends winston.Transport {
  constructor(options) {
    super(options);
    this.name = 'mongoDB';
    this.db = options.db;
  }

  log(info, callback) {
    const entry = new this.db({
      level: info.level,
      message: JSON.stringify(info.message),
      timestamp: new Date(),
      ip: info.message.ip, 
    });
  
    entry.save()
      .then(() => {
        callback(null, true);
      })
      .catch((err) => {
        callback(err);
      });
  }
}

const levels = {
  error: 0,
  warn: 1,
  info: 2
};
const logger = winston.createLogger({
  levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new MongoDBTransport({ db: Log }),
  ],
});



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

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
app.get('/logs', getLogs);



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
app.set('trust proxy', true);
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const start = Date.now();

  res.on('finish', () => {
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: Date.now() - start,
      ip: ip,
    };

    if (res.statusCode >= 500) {
      logger.error(logData);
    } else if (res.statusCode === 400 || res.statusCode === 404) {
      logger.warn(logData);
    } else {
      logger.info(logData);
    }

    next();
  });
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

