<?php
require_once __DIR__ . '/../models/RefundModel.php';
class RefundController {
    private $model;
    public function __construct($mysqli){ $this->model = new RefundModel($mysqli); }
    public function create($bookingId, $amount, $reason){ return $this->model->create($bookingId,$amount,$reason); }
    public function get($refundId){ return $this->model->getById($refundId); }
}
?>
