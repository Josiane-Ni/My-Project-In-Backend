<?php
class FlightModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function create($d){
        $sql = "INSERT INTO flights (airline, origin, destination, departure_time, arrival_time, seats_total, seats_available, price) VALUES (?,?,?,?,?,?,?,?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('ssssiiid',$d['airline'],$d['origin'],$d['destination'],$d['departure_time'],$d['arrival_time'],$d['seats_total'],$d['seats_available'],$d['price']);
        if(!$stmt->execute()) return ['error'=>$stmt->error];
        return ['flight_id'=>$stmt->insert_id];
    }

    public function getById($id){
        $sql = "SELECT * FROM flights WHERE flight_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function search($filters){
        $sql = "SELECT * FROM flights WHERE 1=1";
        $types = '';
        $params = [];
        if(!empty($filters['origin'])) { $sql .= " AND origin = ?"; $types .= 's'; $params[] = $filters['origin']; }
        if(!empty($filters['destination'])) { $sql .= " AND destination = ?"; $types .= 's'; $params[] = $filters['destination']; }
        if(!empty($filters['date'])) { $sql .= " AND DATE(departure_time) = ?"; $types .= 's'; $params[] = $filters['date']; }
        $stmt = $this->db->prepare($sql);
        if($types) {
            $stmt->bind_param($types, ...$params);
        }
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function updateSeats($flightId, $delta){
        $this->db->begin_transaction();
        try {
            $sql = "SELECT seats_available FROM flights WHERE flight_id = ? FOR UPDATE";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param('i',$flightId);
            $stmt->execute();
            $res = $stmt->get_result()->fetch_assoc();
            if(!$res) throw new Exception("Flight not found");
            if($res['seats_available'] + $delta < 0) throw new Exception("Not enough seats");
            $sql2 = "UPDATE flights SET seats_available = seats_available + ? WHERE flight_id = ?";
            $stmt2 = $this->db->prepare($sql2);
            $stmt2->bind_param('ii', $delta, $flightId);
            $stmt2->execute();
            $this->db->commit();
            return true;
        } catch(Exception $e){
            $this->db->rollback();
            return ['error'=>$e->getMessage()];
        }
    }

    public function deleteMany($ids){
        if(empty($ids)) return 0;
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $types = str_repeat('i', count($ids));
        $sql = "DELETE FROM flights WHERE flight_id IN ($placeholders)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param($types, ...$ids);
        $stmt->execute();
        return $stmt->affected_rows;
    }
}
?>
