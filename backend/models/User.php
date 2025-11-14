<?php
class User {
    private $conn;
    private $table_name = "users";
    
    public $user_id;
    public $name;
    public $email;
    public $phone;
    public $password;
    public $role;
    public $created_at;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Check if email exists
    public function emailExists($email) {
        $query = "SELECT user_id, name, email, phone, password, role 
                  FROM " . $this->table_name . " 
                  WHERE email = ? 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($this->user_id, $this->name, $this->email, $this->phone, $this->password, $this->role);
            $stmt->fetch();
            return true;
        }
        return false;
    }
    
    // Create new user
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                 (name, email, phone, password, role) 
                 VALUES (?, ?, ?, ?, ?)";
        
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            error_log("Prepare failed: " . $this->conn->error);
            return false;
        }
        
        // Sanitize inputs
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->role = htmlspecialchars(strip_tags($this->role));
        
        $stmt->bind_param("sssss", $this->name, $this->email, $this->phone, $this->password, $this->role);
        
        if ($stmt->execute()) {
            $this->user_id = $this->conn->insert_id;
            return true;
        } else {
            error_log("Execute failed: " . $stmt->error);
            return false;
        }
    }
    
    // Get user by email
    public function getByEmail($email) {
        $query = "SELECT user_id, name, email, phone, password, role, created_at 
                  FROM " . $this->table_name . " 
                  WHERE email = ? 
                  LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return false;
    }
}
?>
