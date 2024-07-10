const GITHUB_TOKEN = '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'; // Replace with your new token, but don't share it publicly
const GIST_ID = 'f341033477c474069eabd8ec540cf93e';

document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    async function generateKey() {
        const key = Math.random().toString(36).substring(2, 10);
        keyDisplay.textContent = 'Generating key...';

        try {
            await saveKeyToGist(key);
            keyDisplay.textContent = 'Your key is: ' + key;
            console.log('Key saved successfully');
        } catch (error) {
            console.error('Error saving key:', error);
            keyDisplay.textContent = 'Error generating key. Please try again.';
        }
    }

    async function saveKeyToGist(key) {
        const url = `https://api.github.com/gists/${GIST_ID}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Gist');
        }

        const gistData = await response.json();
        let content = { keys: [] };
        if (gistData.files['keys.json']) {
            content = JSON.parse(gistData.files['keys.json'].content);
        }

        content.keys.push({
            key: key,
            timestamp: Date.now()
        });

        const updateResponse = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: {
                    'keys.json': {
                        content: JSON.stringify(content)
                    }
                }
            })
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update Gist');
        }
    }
});
