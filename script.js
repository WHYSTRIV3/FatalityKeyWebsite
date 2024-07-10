document.addEventListener('DOMContentLoaded', function() {
    const generateKeyButton = document.getElementById('generateKeyButton');
    const keyDisplay = document.getElementById('keyDisplay');
    const timerDisplay = document.getElementById('timerDisplay');

    const octokit = new Octokit({
        auth: 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN'
    });

    generateKeyButton.addEventListener('click', generateKey);

    async function generateKey() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

        keyDisplay.textContent = 'Your key is: ' + key;
        startTimer(expirationTime);

        await saveKey(key, expirationTime);
    }

    async function saveKey(key, expirationTime) {
        try {
            const { data: fileData } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: 'WHYSTRIV3',
                repo: 'FatalityKeyWebsite',
                path: 'keys.json'
            });

            let content = { validKeys: [] };
            if (fileData.content) {
                content = JSON.parse(atob(fileData.content));
            }

            content.validKeys.push({ key, expirationTime });

            const updatedContent = btoa(JSON.stringify(content, null, 2));

            await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: 'WHYSTRIV3',
                repo: 'FatalityKeyWebsite',
                path: 'keys.json',
                message: 'Add new key',
                content: updatedContent,
                sha: fileData.sha
            });

            console.log('Key saved:', key);
        } catch (error) {
            console.error('Error saving key:', error);
        }
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
