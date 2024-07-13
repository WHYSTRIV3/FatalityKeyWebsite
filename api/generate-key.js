import { MongoClient } from 'mongodb';

// Connection pooling setup
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  console.log('API route hit:', req.method);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Connect to the database
      const db = (await clientPromise).db('your_database_name'); // Replace with your actual database name

      // Generate a key
      const key = Math.random().toString(36).substring(2, 15);

      // Store the key in the database (optional)
      await db.collection('keys').insertOne({ key, createdAt: new Date() });

      // Send the response
      res.status(200).json({ key: key });
    } catch (error) {
      console.error('Error generating key:', error);
      res.status(500).json({ error: 'Error generating key', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
