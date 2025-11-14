<?php
require_once __DIR__ . '/../models/PromotionModel.php';
class PromotionController {
    private $model;
    public function __construct($mysqli){ $this->model = new PromotionModel($mysqli); }
    public function validate($code){ return $this->model->getByCode($code) ?: ['error'=>'Invalid or expired promo']; }
}
?>
