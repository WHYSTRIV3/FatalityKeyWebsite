import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  console.log('API route hit:', req.method);

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { key } = req.body;

    try {
      await client.connect();
      const database = client.db('fatality_keys');
      const collection = database.collection('keys');

      const keyDoc = await collection.findOne({ key });

      if (keyDoc) {
        res.status(200).json({ valid: true });
      } else {
        res.status(404).json({ valid: false });
      }
    } catch (error) {
      console.error('Error validating key:', error);
      res.status(500).json({ error: 'Error validating key', details: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
