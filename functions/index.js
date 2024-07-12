const functions = require("firebase-functions");
const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Proxy endpoint
app.get("/keys", (req, res) => {
    const firebaseUrl = 'https://your-firebase-project-id.firebaseio.com/keys.json'; // Replace with your Firebase URL
    request(firebaseUrl, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.status(500).send('Error fetching data from Firebase');
        }
    });
});

exports.api = functions.https.onRequest(app);
