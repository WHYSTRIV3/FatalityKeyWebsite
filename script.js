document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    async function generateKey() {
        try {
            const response = await fetch('/generate-key', { method: 'POST' });
            const data = await response.json();
            keyDisplay.textContent = 'Your key is: ' + data.key;
        } catch (error) {
            console.error('Error generating key:', error);
            keyDisplay.textContent = 'Error generating key. Please try again.';
        }
    }
});
