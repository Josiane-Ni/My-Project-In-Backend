<?php
class HotelModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function list($filters = []){
        $sql = "SELECT * FROM hotels WHERE 1=1";
        $types = '';
        $params = [];
        if(!empty($filters['city'])) { $sql .= " AND city = ?"; $types .= 's'; $params[] = $filters['city']; }
        if(!empty($filters['stars'])) { $sql .= " AND stars = ?"; $types .= 'i'; $params[] = (int)$filters['stars']; }
        $stmt = $this->db->prepare($sql);
        if($types){ $stmt->bind_param($types, ...$params); }
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function roomsByHotel($hotelId){
        $sql = "SELECT * FROM rooms WHERE hotel_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$hotelId);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function getRoomById($roomId){
        $sql = "SELECT * FROM rooms WHERE room_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$roomId);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function adjustRoomAvailability($roomId, $delta){
        $this->db->begin_transaction();
        try {
            $sql = "SELECT available_qty FROM rooms WHERE room_id = ? FOR UPDATE";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param('i',$roomId);
            $stmt->execute();
            $row = $stmt->get_result()->fetch_assoc();
            if(!$row) throw new Exception('Room not found');
            if($row['available_qty'] + $delta < 0) throw new Exception('Not enough rooms');
            $sql2 = "UPDATE rooms SET available_qty = available_qty + ? WHERE room_id = ?";
            $stmt2 = $this->db->prepare($sql2);
            $stmt2->bind_param('ii', $delta, $roomId);
            $stmt2->execute();
            $this->db->commit();
            return true;
        } catch(Exception $e){
            $this->db->rollback();
            return ['error'=>$e->getMessage()];
        }
    }
}
?>
