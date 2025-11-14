<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "travel_booking";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get all columns from users table
$result = $conn->query("SHOW COLUMNS FROM users");
$columns = [];
while ($row = $result->fetch_assoc()) {
    $columns[] = $row;
}

echo json_encode([
    "success" => true,
    "table" => "users",
    "columns" => $columns
], JSON_PRETTY_PRINT);

$conn->close();
?>
