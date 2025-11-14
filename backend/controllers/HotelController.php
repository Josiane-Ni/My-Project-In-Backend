<?php
require_once __DIR__ . '/../models/HotelModel.php';
class HotelController {
    private $hotelModel;
    public function __construct($mysqli){ $this->hotelModel = new HotelModel($mysqli); }
    public function listHotels($filters){ return $this->hotelModel->list($filters); }
    public function roomsByHotel($hotelId){ return $this->hotelModel->roomsByHotel($hotelId); }
}
?>
