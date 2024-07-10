const GITHUB_TOKEN = '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';
const GIST_ID = 'https://gist.github.com/WHYSTRIV3/f341033477c474069eabd8ec540cf93e'; // Create a gist and put its ID here

document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    async function generateKey() {
        const key = Math.random().toString(36).substring(2, 10);
        keyDisplay.textContent = 'Your key is: ' + key;

        try {
            await saveKeyToGist(key);
            console.log('Key saved successfully');
        } catch (error) {
            console.error('Error saving key:', error);
        }
    }

    async function saveKeyToGist(key) {
        const url = `https://api.github.com/gists/${GIST_ID}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: {
                    'keys.json': {
                        content: JSON.stringify({ key: key, timestamp: Date.now() })
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save key');
        }
    }
});
