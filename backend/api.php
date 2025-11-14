<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config/connection.php';

$action = $_GET['action'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];

require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/BookingController.php';
require_once __DIR__ . '/controllers/FlightController.php';
require_once __DIR__ . '/controllers/HotelController.php';
require_once __DIR__ . '/controllers/PackageController.php';
require_once __DIR__ . '/controllers/NotificationController.php';
require_once __DIR__ . '/controllers/ReviewController.php';
require_once __DIR__ . '/controllers/PromotionController.php';
require_once __DIR__ . '/controllers/ReportController.php';

$auth = new AuthController($mysqli);
$booking = new BookingController($mysqli);
$flight = new FlightController($mysqli);
$hotel = new HotelController($mysqli);
$package = new PackageController($mysqli);
$notification = new NotificationController($mysqli);
$review = new ReviewController($mysqli);
$promotion = new PromotionController($mysqli);
$report = new ReportController($mysqli);

if($action === 'register' && $method === 'POST'){
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);
    if(!is_array($body) || $body === null){ $body = $_POST ?: []; }
    $res = $auth->register($body['name'] ?? '', $body['email'] ?? '', $body['password'] ?? '', $body['confirmPassword'] ?? null, $body['role'] ?? 'customer');
    echo json_encode($res); exit;
}

if($action === 'verifyEmail' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    echo json_encode($auth->verifyEmail($body['token'] ?? '')); exit;
}

if($action === 'resendVerification' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    echo json_encode($auth->resendVerification($body['email'] ?? '')); exit;
}

// Notifications
if($action === 'listNotifications' && $method === 'GET'){
    if(session_status() === PHP_SESSION_NONE) session_start();
    $userId = $_SESSION['user']['user_id'] ?? null;
    if(!$userId){ echo json_encode([]); exit; }
    echo json_encode($notification->listForUser((int)$userId)); exit;
}

if($action === 'markNotificationRead' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    if(session_status() === PHP_SESSION_NONE) session_start();
    $userId = $_SESSION['user']['user_id'] ?? null;
    if(!$userId){ echo json_encode(['error'=>'Not authenticated']); exit; }
    $ok = $notification->markAsRead((int)($body['notif_id'] ?? 0), (int)$userId);
    echo json_encode(['success'=>$ok ? true : false]); exit;
}

// Reviews
if($action === 'listReviews' && $method === 'GET'){
    $type = $_GET['target_type'] ?? '';
    $tid = (int)($_GET['target_id'] ?? 0);
    echo json_encode($review->list($type,$tid)); exit;
}

if($action === 'addReview' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    if(session_status() === PHP_SESSION_NONE) session_start();
    $userId = $_SESSION['user']['user_id'] ?? null;
    if(!$userId){ echo json_encode(['error'=>'Not authenticated']); exit; }
    $res = $review->add((int)$userId, $body['target_type'] ?? '', (int)($body['target_id'] ?? 0), (int)($body['rating'] ?? 0), $body['comment'] ?? '');
    echo json_encode($res); exit;
}

// Promotions
if($action === 'validatePromo' && $method === 'GET'){
    $code = $_GET['code'] ?? '';
    echo json_encode($promotion->validate($code)); exit;
}

// Reports
if($action === 'salesSummary' && $method === 'GET'){
    $from = $_GET['date_from'] ?? null;
    $to = $_GET['date_to'] ?? null;
    echo json_encode($report->salesSummary($from,$to)); exit;
}

if($action === 'login' && $method === 'POST'){
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);
    if(!is_array($body) || $body === null){ $body = $_POST ?: []; }
    $res = $auth->login($body['email'] ?? '',$body['password'] ?? '');
    echo json_encode($res); exit;
}

if($action === 'logout' && $method === 'POST'){
    echo json_encode($auth->logout()); exit;
}

if($action === 'searchFlights' && $method === 'GET'){
    $filters = [
        'origin'=>$_GET['origin'] ?? null,
        'destination'=>$_GET['destination'] ?? null,
        'date'=>$_GET['date'] ?? null
    ];
    echo json_encode($flight->listFlights($filters)); exit;
}

if($action === 'deleteFlights' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    $ids = $body['ids'] ?? [];
    if(!is_array($ids)) $ids = [];
    $ids = array_map('intval', $ids);
    echo json_encode(['deleted'=>$flight->deleteMany($ids)]); exit;
}

// Hotels
if($action === 'listHotels' && $method === 'GET'){
    $filters = [
        'city'=>$_GET['city'] ?? null,
        'stars'=>isset($_GET['stars']) ? (int)$_GET['stars'] : null,
    ];
    echo json_encode($hotel->listHotels($filters)); exit;
}

if($action === 'hotelRooms' && $method === 'GET'){
    $hotelId = (int)($_GET['hotel_id'] ?? 0);
    if(!$hotelId){ echo json_encode([]); exit; }
    echo json_encode($hotel->roomsByHotel($hotelId)); exit;
}

// Packages
if($action === 'listPackages' && $method === 'GET'){
    echo json_encode($package->listPackages()); exit;
}

if($action === 'bookFlight' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    if(session_status() === PHP_SESSION_NONE) session_start();
    $userId = $_SESSION['user']['user_id'] ?? ($body['user_id'] ?? null);
    if(!$userId) { echo json_encode(['error'=>'Not authenticated']); exit; }
    $res = $booking->bookFlight((int)$userId, (int)($body['flight_id'] ?? 0), (int)($body['seats'] ?? 1), $body['paymentMethod'] ?? 'wallet');
    echo json_encode($res); exit;
}

if($action === 'bookHotel' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    if(session_status() === PHP_SESSION_NONE) session_start();
    $userId = $_SESSION['user']['user_id'] ?? ($body['user_id'] ?? null);
    if(!$userId) { echo json_encode(['error'=>'Not authenticated']); exit; }
    $res = $booking->bookHotel((int)$userId, (int)($body['room_id'] ?? 0), (int)($body['nights'] ?? 1), (int)($body['rooms'] ?? 1), $body['paymentMethod'] ?? 'wallet');
    echo json_encode($res); exit;
}

if($action === 'bookPackage' && $method === 'POST'){
    $body = json_decode(file_get_contents('php://input'), true);
    if(session_status() === PHP_SESSION_NONE) session_start();
    $userId = $_SESSION['user']['user_id'] ?? ($body['user_id'] ?? null);
    if(!$userId) { echo json_encode(['error'=>'Not authenticated']); exit; }
    $res = $booking->bookPackage((int)$userId, (int)($body['pkg_id'] ?? 0), $body['paymentMethod'] ?? 'wallet');
    echo json_encode($res); exit;
}

echo json_encode(['error'=>'Unknown action']);
?>
