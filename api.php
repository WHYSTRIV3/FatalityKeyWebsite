<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$keysFile = 'keys.json';

function generateKey() {
    return bin2hex(random_bytes(16));
}

function saveKey($key) {
    global $keysFile;
    $keys = json_decode(file_get_contents($keysFile), true) ?: [];
    $keys[] = $key;
    file_put_contents($keysFile, json_encode($keys));
}

function validateKey($key) {
    global $keysFile;
    $keys = json_decode(file_get_contents($keysFile), true) ?: [];
    return in_array($key, $keys);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'generate-key') {
        $key = generateKey();
        saveKey($key);
        echo json_encode(["key" => $key]);
    } elseif (isset($_GET['action']) && $_GET['action'] === 'validate-key') {
        $key = $_GET['key'] ?? '';
        $isValid = validateKey($key);
        echo json_encode(["valid" => $isValid]);
    }
}
?>
