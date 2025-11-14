<?php
require_once __DIR__ . '/../models/NotificationModel.php';
class NotificationController {
    private $model;
    public function __construct($mysqli){ $this->model = new NotificationModel($mysqli); }
    public function listForUser($userId){ return $this->model->listForUser($userId); }
    public function markAsRead($notifId, $userId){ return $this->model->markAsRead($notifId, $userId); }
}
?>
