<?php
class NotificationModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function create($userId, $message, $type = 'info'){
        $sql = "INSERT INTO notifications (user_id, message, type) VALUES (?,?,?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('iss',$userId,$message,$type);
        $stmt->execute();
    }

    public function listForUser($userId){
        $sql = "SELECT * FROM notifications WHERE user_id = ? ORDER BY sent_at DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$userId);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getById($notifId){
        $sql = "SELECT * FROM notifications WHERE notif_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$notifId);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function markAsRead($notifId, $userId){
        $sql = "UPDATE notifications SET is_read = 1 WHERE notif_id = ? AND user_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('ii',$notifId,$userId);
        return $stmt->execute();
    }
}
?>
