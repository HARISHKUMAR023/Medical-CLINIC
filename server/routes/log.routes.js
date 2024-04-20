// routes/index.js

const express = require('express');
const router = express.Router();
const loggingMiddleware = require('../middlewares/loggingMiddleware');
const fetchLogsdata  = require('../controllers/Log.controllers');

// router.get('/log', loggingMiddleware, (req, res) => {

//   const { ipAddress, location, timestamp } = req;

//   const logData = `IP Address: ${ipAddress}\nLocation: ${location}\nTimestamp: ${timestamp}`;

//   res.send(logData);
// });

router.get('/logdata ',fetchLogsdata.fetchLogs )

module.exports = router;
