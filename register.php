<?php
// Simple stub to indicate that API calls should go through api.php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");

echo json_encode([
    'success' => false,
    'message' => 'Please use api.php with action=\'register\' for registration.'
]);
?>
