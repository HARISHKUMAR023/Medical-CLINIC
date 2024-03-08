const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Consider using CORS if necessary
const path = require('path'); // For serving static assets in production

const userRoutes = require('./routes/user.route'); // Replace with your user routes path
const authRoutes = require('./routes/auth.routes'); // Replace with your auth routes path
// Add other route imports as needed (e.g., protected routes)

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Connect to MongoDB database (replace with your connection string)
const mongoUri = 'mongodb://localhost:27017/medical'; // Replace with your actual connection string

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    const corsOptions = {
      origin: 'http://localhost:5173', // Replace with your React app's URL
      optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    };
// Middleware
app.use(cors()); // Uncomment this if necessary for CORS
app.use(express.json());
// Routes
app.use('/api/', userRoutes);
 app.use('/api/', authRoutes);
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
