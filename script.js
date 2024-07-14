const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const generateKey = require('./keyGenerator');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate-key', async (req, res) => {
  const key = generateKey();
  const newKey = await prisma.key.create({
    data: { key }
  });
  res.json(newKey);
});

app.post('/validate-key', async (req, res) => {
  const { key } = req.body;
  const foundKey = await prisma.key.findUnique({
    where: { key }
  });

  if (!foundKey || foundKey.used) {
    return res.status(400).json({ error: 'Invalid or used key' });
  }

  await prisma.key.update({
    where: { key },
    data: { used: true }
  });

  res.json({ success: true });
});

// Catch-all to serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
