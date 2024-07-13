const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  console.log('API route hit:', req.method);  // Add this line for logging
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      await client.connect();
      const db = client.db('keySystem');
      const collection = db.collection('keys');

      const key = Math.random().toString(36).substring(2, 15);
      await collection.insertOne({ key: key, used: false, createdAt: new Date() });

      res.status(200).json({ key: key });
    } catch (error) {
      console.error('Error generating key:', error);
      res.status(500).json({ error: 'Error generating key', details: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
