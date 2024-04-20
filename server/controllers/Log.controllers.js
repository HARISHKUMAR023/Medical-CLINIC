// controller.js
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function fetchLogs(req, res) {
  try {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();
    const logs = await db.collection('logs').find({}).toArray();
    client.close(); // Close the connection after fetching logs
    res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

module.exports = {
  fetchLogs
};
