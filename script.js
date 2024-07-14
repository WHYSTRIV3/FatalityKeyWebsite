const generateKeyButton = document.getElementById('generateKeyButton');
const keyDisplay = document.getElementById('keyDisplay');

generateKeyButton.addEventListener('click', async () => {
    generateKeyButton.disabled = true;
    keyDisplay.textContent = 'Generating key...';
    try {
        const response = await fetch('/api/generate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        keyDisplay.textContent = `Your key: ${data.key}`;
    } catch (error) {
        console.error('Error generating key:', error);
        keyDisplay.textContent = `Error: ${error.message}`;
    } finally {
        generateKeyButton.disabled = false;
    }
});
