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
const Productitem = require('./routes/Productitem.routes')
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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});