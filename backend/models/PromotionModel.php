<?php
class PromotionModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function getByCode($code){
        $sql = "SELECT * FROM promotions WHERE code = ? AND (expiry_date IS NULL OR expiry_date >= CURDATE())";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('s',$code);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>
