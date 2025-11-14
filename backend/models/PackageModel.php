<?php
class PackageModel {
    private $db;
    public function __construct($mysqli){ $this->db = $mysqli; }

    public function list(){
        $sql = "SELECT * FROM packages ORDER BY pkg_id DESC";
        $res = $this->db->query($sql);
        return $res ? $res->fetch_all(MYSQLI_ASSOC) : [];
    }

    public function getById($id){
        $sql = "SELECT * FROM packages WHERE pkg_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>
