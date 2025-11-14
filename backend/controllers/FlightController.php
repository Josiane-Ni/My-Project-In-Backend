<?php
require_once __DIR__ . '/../models/FlightModel.php';
class FlightController {
    private $db;
    private $model;
    public function __construct($mysqli){
        $this->db = $mysqli;
        $this->model = new FlightModel($mysqli);
    }

    public function createFlight($data){
        return $this->model->create($data);
    }

    public function listFlights($filters = []){
        return $this->model->search($filters);
    }

    public function get($id){
        return $this->model->getById($id);
    }

    public function update($id,$data){
        // left as exercise per pattern
        return ['error'=>'Not implemented'];
    }

    public function delete($id){
        // left as exercise per pattern
        return ['error'=>'Not implemented'];
    }

    public function deleteMany($ids){
        return $this->model->deleteMany($ids);
    }
}
?>
