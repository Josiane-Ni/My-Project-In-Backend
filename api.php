<?php
// Enable CORS (relaxed for dev; adjust origin if you want to lock it down)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database configuration
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "travel_booking";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

$action = $input['action'] ?? '';

if ($action === 'register') {
    registerUser($conn, $input);
} elseif ($action === 'login') {
    loginUser($conn, $input);
} else {
    echo json_encode(["success" => false, "message" => "Invalid action"]);
}

function registerUser($conn, $data) {
    // First, detect the primary key column name
    $primary_key = detectPrimaryKey($conn);
    if (!$primary_key) {
        echo json_encode(["success" => false, "message" => "Cannot determine primary key column"]);
        return;
    }

    // Validate required fields
    if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
        echo json_encode(["success" => false, "message" => "Name, email and password are required"]);
        return;
    }

    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        return;
    }

    // Validate password length
    if (strlen($data['password']) < 8) {
        echo json_encode(["success" => false, "message" => "Password must be at least 8 characters"]);
        return;
    }

    // Check if email exists
    $check_sql = "SELECT $primary_key FROM users WHERE email = ?";
    $check_stmt = $conn->prepare($check_sql);
    if (!$check_stmt) {
        echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
        return;
    }
    
    $check_stmt->bind_param("s", $data['email']);
    $check_stmt->execute();
    $check_stmt->store_result();
    
    if ($check_stmt->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        $check_stmt->close();
        return;
    }
    $check_stmt->close();

    // Insert new user WITHOUT phone column
    $insert_sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    $insert_stmt = $conn->prepare($insert_sql);
    
    if (!$insert_stmt) {
        echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
        return;
    }
    $role = $data['role'] ?? 'customer';
    $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
    
    $insert_stmt->bind_param("ssss", $data['name'], $data['email'], $hashed_password, $role);
    
    if ($insert_stmt->execute()) {
        echo json_encode([
            "success" => true, 
            "message" => "User registered successfully!",
            "user" => [
                "id" => $insert_stmt->insert_id,
                "name" => $data['name'],
                "email" => $data['email'],
                "role" => $role
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Registration failed: " . $insert_stmt->error]);
    }
    
    $insert_stmt->close();
}

function loginUser($conn, $data) {
    if (empty($data['email']) || empty($data['password'])) {
        echo json_encode(["success" => false, "message" => "Email and password are required"]);
        return;
    }

    // Get all columns dynamically
    $result = $conn->query("SHOW COLUMNS FROM users");
    $columns = [];
    while ($row = $result->fetch_assoc()) {
        $columns[] = $row['Field'];
    }
    
    $column_list = implode(', ', $columns);
    $sql = "SELECT $column_list FROM users WHERE email = ?";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
        return;
    }
    
    $stmt->bind_param("s", $data['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "User not found"]);
        return;
    }
    
    $user = $result->fetch_assoc();
    
    if (password_verify($data['password'], $user['password'])) {
        // Determine the ID field name
        $id_field = isset($user['id']) ? 'id' : (isset($user['user_id']) ? 'user_id' : 'id');
        
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => [
                "id" => $user[$id_field],
                "name" => $user['name'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
    
    $stmt->close();
}

function detectPrimaryKey($conn) {
    $result = $conn->query("SHOW KEYS FROM users WHERE Key_name = 'PRIMARY'");
    if ($result && $result->num_rows > 0) {
        $key = $result->fetch_assoc();
        return $key['Column_name'];
    }
    return 'id'; // default fallback
}

$conn->close();
?>
