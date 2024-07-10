document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');
    const timerDisplay = document.getElementById('timerDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    function generateKey() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

        keyDisplay.textContent = 'Your key is: ' + key;
        startTimer(expirationTime);

        saveKey(key, expirationTime);
    }

    function saveKey(key, expirationTime) {
        let keys = JSON.parse(localStorage.getItem('keys') || '[]');
        keys.push({ key, expirationTime });
        localStorage.setItem('keys', JSON.stringify(keys));
        console.log('Key saved:', key);
    }

    function startTimer(expirationTime) {
        function updateTimer() {
            const now = Date.now();
            const timeLeft = expirationTime - now;

            if (timeLeft <= 0) {
                timerDisplay.textContent = 'Key has expired';
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerDisplay.textContent = `Time left: ${hours}h ${minutes}m ${seconds}s`;
            setTimeout(updateTimer, 1000);
        }

        updateTimer();
    }
});
