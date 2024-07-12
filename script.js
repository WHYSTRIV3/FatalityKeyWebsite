// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmXeTBDo8jE9BRlRNEr-dciNidWOaAm50",
    authDomain: "fatalitykey.firebaseapp.com",
    databaseURL: "https://fatalitykey-default-rtdb.firebaseio.com", // Add this line
    projectId: "fatalitykey",
    storageBucket: "fatalitykey.appspot.com",
    messagingSenderId: "986288270355",
    appId: "1:986288270355:web:3514ce300cf1511a7de3e6",
    measurementId: "G-PD34LQNLNF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    async function generateKey() {
        try {
            const key = Math.random().toString(36).substring(2, 10);
            keyDisplay.textContent = 'Generating key...';

            await saveKeyToDatabase(key);
            keyDisplay.textContent = 'Your key is: ' + key;
            console.log('Key saved successfully');
        } catch (error) {
            console.error('Error generating or saving key:', error);
            keyDisplay.textContent = 'Error: ' + error.message;
        }
    }

    async function saveKeyToDatabase(key) {
        const keysRef = database.ref('keys');
        await keysRef.push({
            key: key,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
});
