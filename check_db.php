<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "travel_booking";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$result = $conn->query("DESCRIBE users");
$columns = [];
while ($row = $result->fetch_assoc()) {
    $columns[] = $row['Field'];
}

echo json_encode([
    "success" => true,
    "columns" => $columns
]);

$conn->close();
