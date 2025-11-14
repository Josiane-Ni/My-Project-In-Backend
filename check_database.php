<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "travel_booking";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Check if users table exists and show its structure
$result = $conn->query("SHOW TABLES LIKE 'users'");
if ($result->num_rows === 0) {
    echo json_encode(["error" => "Users table does not exist"]);
    exit;
}

// Show table structure
$structure = $conn->query("DESCRIBE users");
$columns = [];
while ($row = $structure->fetch_assoc()) {
    $columns[] = $row;
}

echo json_encode([
    "success" => true,
    "table_structure" => $columns
]);

$conn->close();
?>
