document.getElementById('generateKeyButton').addEventListener('click', function() {
    fetch('api.php?action=generate-key', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.key) {
            document.getElementById('keyDisplay').textContent = 'Your key is: ' + data.key;
        } else {
            document.getElementById('keyDisplay').textContent = 'Failed to generate key';
        }
    })
    .catch(error => {
        console.error('Error generating key:', error);
        document.getElementById('keyDisplay').textContent = 'Error generating key';
    });
});
