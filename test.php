<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

echo json_encode([
    'success' => true,
    'message' => 'Backend is working!',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
