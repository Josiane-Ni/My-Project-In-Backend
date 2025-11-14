<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "travel_booking";

// Test database connection
$conn = new mysqli($host, $user, $pass, $dbname);

$results = [];

if ($conn->connect_error) {
    $results['database_connection'] = "FAILED: " . $conn->connect_error;
} else {
    $results['database_connection'] = "SUCCESS";
    
    // Test if users table exists
    $table_result = $conn->query("SHOW TABLES LIKE 'users'");
    if ($table_result->num_rows > 0) {
        $results['users_table'] = "EXISTS";
        
        // Show table structure
        $structure = $conn->query("DESCRIBE users");
        $columns = [];
        while ($row = $structure->fetch_assoc()) {
            $columns[] = $row['Field'] . " (" . $row['Type'] . ")";
        }
        $results['table_columns'] = $columns;
        
        // Test if we can insert data
        $test_email = "test_" . time() . "@example.com";
        $test_sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($test_sql);
        if ($stmt) {
            $name = "Test User";
            $password = password_hash("Test123!", PASSWORD_DEFAULT);
            $role = "customer";
            $stmt->bind_param("ssss", $name, $test_email, $password, $role);
            
            if ($stmt->execute()) {
                $results['test_insert'] = "SUCCESS - User ID: " . $stmt->insert_id;
                // Clean up
                $conn->query("DELETE FROM users WHERE email = '$test_email'");
            } else {
                $results['test_insert'] = "FAILED: " . $stmt->error;
            }
            $stmt->close();
        } else {
            $results['test_insert'] = "FAILED: " . $conn->error;
        }
    } else {
        $results['users_table'] = "DOES NOT EXIST";
    }
}

$conn->close();
echo json_encode($results, JSON_PRETTY_PRINT);
?>
