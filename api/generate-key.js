import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  console.log('API route hit:', req.method);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const key = Math.random().toString(36).substring(2, 15);
      res.status(200).json({ key: key });
    } catch (error) {
      console.error('Error generating key:', error);
      res.status(500).json({ error: 'Error generating key', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
