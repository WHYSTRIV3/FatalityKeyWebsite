const generateKeyButton = document.getElementById('generateKeyButton');
const keyDisplay = document.getElementById('keyDisplay');
const timerDisplay = document.getElementById('timerDisplay');

let countdown;

generateKeyButton.addEventListener('click', () => {
    const dummyKey = 'DUMMY-' + Math.random().toString(36).substring(2, 15);
    keyDisplay.textContent = `Your key: ${dummyKey}`;
    startTimer(300); // 5 minutes countdown
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
