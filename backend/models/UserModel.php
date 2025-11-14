<?php
class UserModel {
    private $db;
    public function __construct($mysqli){
        $this->db = $mysqli;
    }

    public function createUser($name, $email, $passwordHash, $role = 'customer'){
        $sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        if(!$stmt){
            if($this->db->errno === 1146){
                $create = "CREATE TABLE IF NOT EXISTS users (
                  user_id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(150) NOT NULL,
                  email VARCHAR(150) NOT NULL UNIQUE,
                  password VARCHAR(255) NOT NULL,
                  role ENUM('customer','agent','admin') DEFAULT 'customer',
                  wallet DECIMAL(10,2) DEFAULT 0.00,
                  loyalty_points INT DEFAULT 0,
                  email_verified TINYINT(1) DEFAULT 0,
                  verification_token VARCHAR(64) NULL,
                  verification_sent_at TIMESTAMP NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
                if($this->db->query($create)){
                    $stmt = $this->db->prepare($sql);
                    if(!$stmt){
                        return ['error'=>$this->db->error ?: 'Prepare failed after table create'];
                    }
                } else {
                    return ['error'=>'Failed to create users table'];
                }
            } else {
                return ['error'=>$this->db->error ?: 'Prepare failed'];
            }
        }
        $stmt->bind_param('ssss',$name,$email,$passwordHash,$role);
        if(!$stmt->execute()) {
            if($stmt->errno === 1062) return ['error'=>'Email already used'];
            if($stmt->errno === 1146) {
                $create = "CREATE TABLE IF NOT EXISTS users (
                  user_id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(150) NOT NULL,
                  email VARCHAR(150) NOT NULL UNIQUE,
                  password VARCHAR(255) NOT NULL,
                  role ENUM('customer','agent','admin') DEFAULT 'customer',
                  wallet DECIMAL(10,2) DEFAULT 0.00,
                  loyalty_points INT DEFAULT 0,
                  email_verified TINYINT(1) DEFAULT 0,
                  verification_token VARCHAR(64) NULL,
                  verification_sent_at TIMESTAMP NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
                if($this->db->query($create)){
                    $stmt2 = $this->db->prepare($sql);
                    $stmt2->bind_param('ssss',$name,$email,$passwordHash,$role);
                    if($stmt2->execute()) return ['user_id'=>$stmt2->insert_id];
                    return ['error'=>$stmt2->error ?: 'Insert failed after auto-create'];
                }
                return ['error'=>'Failed to create users table'];
            }
            return ['error'=>$stmt->error ?: 'Insert failed'];
        }
        return ['user_id'=>$stmt->insert_id];
    }

    public function getUserByEmail($email){
        $sql = "SELECT user_id, name, email, password, role, wallet, loyalty_points, email_verified, verification_token, verification_sent_at FROM users WHERE email = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('s',$email);
        $stmt->execute();
        $res = $stmt->get_result()->fetch_assoc();
        return $res ?: null;
    }

    public function getById($id){
        $sql = "SELECT user_id, name, email, role, wallet, loyalty_points, email_verified FROM users WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function adjustWalletAndPoints($userId, $walletDelta, $pointsDelta){
        $this->db->begin_transaction();
        try {
            $sql = "UPDATE users SET wallet = wallet + ?, loyalty_points = loyalty_points + ? WHERE user_id = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param('dii', $walletDelta, $pointsDelta, $userId);
            $stmt->execute();
            $this->db->commit();
            return true;
        } catch (Exception $e){
            $this->db->rollback();
            return false;
        }
    }

    public function setVerificationToken($userId, $token){
        $sql = "UPDATE users SET verification_token = ?, verification_sent_at = NOW() WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('si', $token, $userId);
        return $stmt->execute();
    }

    public function verifyByToken($token){
        $this->db->begin_transaction();
        try {
            $sql = "SELECT user_id FROM users WHERE verification_token = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param('s',$token);
            $stmt->execute();
            $row = $stmt->get_result()->fetch_assoc();
            if(!$row) throw new Exception('Invalid token');
            $uid = (int)$row['user_id'];
            $sql2 = "UPDATE users SET email_verified = 1, verification_token = NULL WHERE user_id = ?";
            $stmt2 = $this->db->prepare($sql2);
            $stmt2->bind_param('i',$uid);
            $stmt2->execute();
            $this->db->commit();
            return true;
        } catch (Exception $e){
            $this->db->rollback();
            return ['error'=>$e->getMessage()];
        }
    }
}
?>
