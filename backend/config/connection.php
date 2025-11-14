<?php
// connection.php
// CORS: reflect requesting Origin (dev only) and allow credentials for XHR with cookies
 $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
 if (!empty($origin)) {
     header('Access-Control-Allow-Origin: ' . $origin);
     header('Access-Control-Allow-Credentials: true');
 } else {
     // Fallback when no Origin header (direct PHP access)
     header('Access-Control-Allow-Origin: *');
 }
 header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
 header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
 header('Access-Control-Max-Age: 86400');
 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS',''); // update for your MySQL
define('DB_NAME','travel_booking');

$mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if($mysqli->connect_errno){
    // 1049: Unknown database
    if($mysqli->connect_errno === 1049){
        $tmp = @new mysqli(DB_HOST, DB_USER, DB_PASS);
        if(!$tmp->connect_errno){
            $tmp->query("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
            $tmp->close();
            $mysqli = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        }
    }
}

if($mysqli->connect_errno) {
    error_log("DB connect error: " . $mysqli->connect_error);
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
$mysqli->set_charset('utf8mb4');
?>
