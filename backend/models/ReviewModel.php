<?php
class ReviewModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function add($userId, $targetType, $targetId, $rating, $comment){
        $sql = "INSERT INTO reviews (user_id, target_type, target_id, rating, comment) VALUES (?,?,?,?,?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('isiis', $userId, $targetType, $targetId, $rating, $comment);
        if(!$stmt->execute()) return ['error'=>$stmt->error];
        return ['review_id'=>$stmt->insert_id];
    }

    public function list($targetType, $targetId){
        $sql = "SELECT * FROM reviews WHERE target_type = ? AND target_id = ? ORDER BY created_at DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('si', $targetType, $targetId);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
?>
