<?php
class RefundModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function create($bookingId, $amount, $reason, $status = 'processed'){
        $sql = "INSERT INTO refunds (booking_id, amount, reason, status, processed_at) VALUES (?,?,?,?,NOW())";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('idss',$bookingId,$amount,$reason,$status);
        if(!$stmt->execute()) return ['error'=>$stmt->error];
        return ['refund_id'=>$stmt->insert_id];
    }

    public function getById($refundId){
        $sql = "SELECT * FROM refunds WHERE refund_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$refundId);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>
