module.exports = async (req, res) => {
    // CORS headers (as in the previous answer)

    if (req.method === 'POST') {
        try {
            await client.connect();
            const db = client.db('keySystem');
            const collection = db.collection('keys');

            const key = generateKey();
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
