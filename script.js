document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');

    generateKeyButton.addEventListener('click', generateKey);

    async function generateKey() {
        try {
            const key = Math.random().toString(36).substring(2, 10);
            keyDisplay.textContent = 'Generating key...';

            const gistId = getGistIdFromUrl(GIST_URL);
            await saveKeyToGist(key, gistId);
            keyDisplay.textContent = 'Your key is: ' + key;
            console.log('Key saved successfully');
        } catch (error) {
            console.error('Error generating or saving key:', error);
            keyDisplay.textContent = 'Error: ' + error.message;
        }
    }

    function getGistIdFromUrl(url) {
        const parts = url.split('/');
        return parts[parts.length - 1];
    }

    async function saveKeyToGist(key, gistId) {
        const url = `https://api.github.com/gists/${gistId}`;
        console.log('Fetching Gist from URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Gist: ${response.status} ${response.statusText}`);
        }

        const gistData = await response.json();
        console.log('Gist data:', gistData);

        let content = { keys: [] };
        if (gistData.files['keys.json']) {
            try {
                content = JSON.parse(gistData.files['keys.json'].content);
            } catch (error) {
                console.error('Error parsing JSON content:', error);
            }
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
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                files: {
                    'keys.json': {
                        content: JSON.stringify(content, null, 2)
                    }
                }
            })
        });

        if (!updateResponse.ok) {
            throw new Error(`Failed to update Gist: ${updateResponse.status} ${updateResponse.statusText}`);
        }
    }
});
