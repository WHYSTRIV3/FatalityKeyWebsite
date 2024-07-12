// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmXeTBDo8jE9BRlRNEr-dciNidWOaAm50",
    authDomain: "fatalitykey.firebaseapp.com",
    projectId: "fatalitykey",
    storageBucket: "fatalitykey.appspot.com",
    messagingSenderId: "986288270355",
    appId: "1:986288270355:web:3514ce300cf1511a7de3e6",
    measurementId: "G-PD34LQNLNF"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const analytics = firebase.analytics();

document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    function generateKey() {
        try {
            const key = Math.random().toString(36).substring(2, 10);
            keyDisplay.textContent = 'Generating key...';

            saveKeyToDatabase(key);
            keyDisplay.textContent = 'Your key is: ' + key;
            console.log('Key saved successfully');
        } catch (error) {
            console.error('Error generating or saving key:', error);
            keyDisplay.textContent = 'Error: ' + error.message;
        }
    }

    function saveKeyToDatabase(key) {
        const newKeyRef = database.ref('keys').push();
        newKeyRef.set({
            key: key,
            timestamp: Date.now()
        });
    }
});
