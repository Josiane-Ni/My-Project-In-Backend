<?php
class BookingModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function create($data){
        $sql = "INSERT INTO bookings (user_id, type, ref_id, total_amount, status) VALUES (?,?,?,?,?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('isiis', $data['user_id'], $data['type'], $data['ref_id'], $data['total_amount'], $data['status']);
        if(!$stmt->execute()) return ['error'=>$stmt->error];
        return ['booking_id'=>$stmt->insert_id];
    }

    public function addItem($bookingId, $details, $price){
        $sql = "INSERT INTO booking_items (booking_id, details_json, price) VALUES (?,?,?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('isd', $bookingId, $details, $price);
        $stmt->execute();
    }

    public function getById($id){
        $sql = "SELECT * FROM bookings WHERE booking_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function updateStatus($id,$status){
        $sql = "UPDATE bookings SET status = ? WHERE booking_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('si',$status,$id);
        $stmt->execute();
    }

    public function createRefund($bookingId, $amount, $reason){
        $sql = "INSERT INTO refunds (booking_id, amount, reason, status, processed_at) VALUES (?,?,?,?,NOW())";
        $stmt = $this->db->prepare($sql);
        $status = 'processed';
        $stmt->bind_param('idss', $bookingId, $amount, $reason, $status);
        $stmt->execute();
    }
}
?>
