<?php
class ReportController {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }
    public function salesSummary($dateFrom = null, $dateTo = null){
        $sql = "SELECT type, COUNT(*) as orders, SUM(total_amount) as revenue FROM bookings WHERE 1=1";
        $types = '';
        $params = [];
        if($dateFrom){ $sql .= " AND DATE(booked_at) >= ?"; $types .= 's'; $params[] = $dateFrom; }
        if($dateTo){ $sql .= " AND DATE(booked_at) <= ?"; $types .= 's'; $params[] = $dateTo; }
        $sql .= " GROUP BY type";
        $stmt = $this->db->prepare($sql);
        if($types){ $stmt->bind_param($types, ...$params); }
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
?>
