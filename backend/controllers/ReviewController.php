<?php
require_once __DIR__ . '/../models/ReviewModel.php';
class ReviewController {
    private $model;
    public function __construct($mysqli){ $this->model = new ReviewModel($mysqli); }
    public function add($userId, $targetType, $targetId, $rating, $comment){ return $this->model->add($userId,$targetType,$targetId,$rating,$comment); }
    public function list($targetType, $targetId){ return $this->model->list($targetType,$targetId); }
}
?>
