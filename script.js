document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    function generateKey() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        keyDisplay.textContent = 'Your key is: ' + key;

        // Instead of saving to a server, we'll save to localStorage
        saveKey(key);
    }

    function saveKey(key) {
        let keys = JSON.parse(localStorage.getItem('keys') || '[]');
        keys.push(key);
        localStorage.setItem('keys', JSON.stringify(keys));
        console.log('Key saved:', key);
    }
});
