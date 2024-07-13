const generateKeyButton = document.getElementById('generateKeyButton');
const keyDisplay = document.getElementById('keyDisplay');
const timerDisplay = document.getElementById('timerDisplay');

let countdown;

generateKeyButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/generate-key', {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const { key } = data;
        keyDisplay.textContent = `Your key: ${key}`;
        startTimer(300); // 5 minutes countdown
    } catch (error) {
        console.error('Error generating key:', error);
        keyDisplay.textContent = `Error generating key: ${error.message}`;
    }
});



function startTimer(duration) {
    let timer = duration;
    clearInterval(countdown);
    
    countdown = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        timerDisplay.textContent = `Key expires in: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (--timer < 0) {
            clearInterval(countdown);
            keyDisplay.textContent = 'Key expired. Generate a new one.';
            timerDisplay.textContent = '';
        }
    }, 1000);
}
