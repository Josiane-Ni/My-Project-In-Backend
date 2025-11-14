<?php
require_once __DIR__ . '/../models/PackageModel.php';
class PackageController {
    private $pkgModel;
    public function __construct($mysqli){ $this->pkgModel = new PackageModel($mysqli); }
    public function listPackages(){ return $this->pkgModel->list(); }
    public function get($id){ return $this->pkgModel->getById($id); }
}
?>
