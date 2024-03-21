const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Consider using CORS if necessary
const path = require('path'); // For serving static assets in production
const rolsRoutes = require('./routes/rols.routes')
const userRoutes = require('./routes/user.route'); // Replace with your user routes path
const authRoutes = require('./routes/auth.routes'); // Replace with your auth routes path
// Add other route imports as needed (e.g., protected routes)
const FinancialYearControllers = require('./routes/FinancialYear.routes');
const manufacturerController = require('./routes/manufacturer.routes')

const Product = require('./routes/Product.routes');
const Paymenttype = require('./routes/paymenttype.routes')
const supplierRoutes = require('./routes/suppliers.routes');
const PatientRoutes = require('./routes/Patient.routes') 
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000; // Use environment variable for port
const Databaseurl = process.env.MONGO_URI


app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads/profiles')));
app.use('/uploads/productfile', express.static(path.join(__dirname, 'uploads/productfile')));

app.use('/uploads/manufacturerfile', express.static(path.join(__dirname, 'uploads/manufacturerfile')));

// Connect to MongoDB database (replace with your connection string)
const mongoUri =  Databaseurl; // Replace with your actual connection string

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    const corsOptions = {
      origin: 'http://localhost:5173/', // Replace with your React app's URL
      optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    };
// Middleware
app.use(cors()); // Uncomment this if necessary for CORS
app.use(express.json());
// Routes
app.use('/api/', userRoutes);
 app.use('/api/', authRoutes);
 app.use('/api/',rolsRoutes)
 app.use('/api/',FinancialYearControllers)
 app.use('/api/',Product)
 app.use('/api/', manufacturerController)
 app.use('/api/',Paymenttype)
 app.use('/api', supplierRoutes);
 app.use('/api', PatientRoutes);
// Add other route handler mappings here

// Serve static assets in production (optional)
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'public')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });
// }

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
