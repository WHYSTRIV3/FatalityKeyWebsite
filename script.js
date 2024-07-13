document.getElementById('generateKeyButton').addEventListener('click', generateKey);

async function generateKey() {
    const response = await fetch('http://localhost:3000/generate-key', {
        method: 'POST',
    });
    const data = await response.json();
    const keyDisplay = document.getElementById('keyDisplay');
    const timerDisplay = document.getElementById('timerDisplay');
    
    keyDisplay.innerText = `Generated Key: ${data.key}`;
    
    let timeLeft = 300; // 5 minutes
    const countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.innerText = 'Key expired';
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.innerText = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);
}
