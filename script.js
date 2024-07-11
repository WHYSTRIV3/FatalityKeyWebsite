

const GITHUB_TOKEN = ''; // Replace with your GitHub Personal Access Token
const GIST_ID = '';

const GIST_RAW_URL = `https://gist.githubusercontent.com/WHYSTRIV3/f341033477c474069eabd8ec540cf93e/raw/3c7cfba8454a27f0233d0a3548c0f8842d7e403a/keys.json`;

document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    async function generateKey() {
        try {
            const key = Math.random().toString(36).substring(2, 10);
            keyDisplay.textContent = 'Generating key...';

            await saveKeyToGist(key);
            keyDisplay.textContent = 'Your key is: ' + key;
            console.log('Key saved successfully');
        } catch (error) {
            console.error('Error generating or saving key:', error);
            keyDisplay.textContent = 'Error: ' + error.message;
        }
    }

    async function saveKeyToGist(key) {
        const url = `https://api.github.com/gists/${GIST_ID}`;
        console.log('Fetching Gist from URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Gist: ${response.status} ${response.statusText}`);
        }

        const gistData = await response.json();
        console.log('Gist data:', gistData);

        let content = { keys: [] };
        if (gistData.files['keys.json']) {
            content = JSON.parse(gistData.files['keys.json'].content);
        }

        content.keys.push({
            key: key,
            timestamp: Date.now()
        });

        console.log('Updating Gist with new key:', key);

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
            throw new Error(`Failed to update Gist: ${updateResponse.status} ${updateResponse.statusText}`);
        }
    }
});
