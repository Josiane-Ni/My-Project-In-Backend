<?php
require_once __DIR__ . '/../models/BookingModel.php';
require_once __DIR__ . '/../models/FlightModel.php';
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/../models/NotificationModel.php';
require_once __DIR__ . '/../models/HotelModel.php';
require_once __DIR__ . '/../models/PackageModel.php';

class BookingController {
    private $db;
    private $bookingModel;
    private $flightModel;
    private $userModel;
    private $notifModel;
    private $hotelModel;
    private $packageModel;

    public function __construct($mysqli){
        $this->db = $mysqli;
        $this->bookingModel = new BookingModel($mysqli);
        $this->flightModel = new FlightModel($mysqli);
        $this->userModel = new UserModel($mysqli);
        $this->notifModel = new NotificationModel($mysqli);
        $this->hotelModel = new HotelModel($mysqli);
        $this->packageModel = new PackageModel($mysqli);
        if(session_status() === PHP_SESSION_NONE) session_start();
    }

    public function bookFlight($userId, $flightId, $seatsRequested, $paymentMethod = 'wallet', $promoCode = null){
        $this->db->begin_transaction();
        try {
            $sql = "SELECT * FROM flights WHERE flight_id = ? FOR UPDATE";
            $stmt = $this->db->prepare($sql);
            $stmt->bind_param('i',$flightId);
            $stmt->execute();
            $flight = $stmt->get_result()->fetch_assoc();
            if(!$flight) throw new Exception("Flight not found");
            if($flight['seats_available'] < $seatsRequested) throw new Exception("Not enough seats");

            $total = $flight['price'] * $seatsRequested;

            $createBooking = $this->bookingModel->create([
                'user_id'=>$userId,
                'type'=>'flight',
                'ref_id'=>$flightId,
                'total_amount'=>$total,
                'status'=>'confirmed'
            ]);
            if(isset($createBooking['error'])) throw new Exception($createBooking['error']);
            $bookingId = $createBooking['booking_id'];

            $sqlUpd = "UPDATE flights SET seats_available = seats_available - ? WHERE flight_id = ?";
            $stmt2 = $this->db->prepare($sqlUpd);
            $stmt2->bind_param('ii', $seatsRequested, $flightId);
            $stmt2->execute();

            $this->bookingModel->addItem($bookingId, json_encode(['seats'=>$seatsRequested,'airline'=>$flight['airline']]), $total);

            if($paymentMethod === 'wallet'){
                $sqlW = "UPDATE users SET wallet = wallet - ? WHERE user_id = ?";
                $stmtw = $this->db->prepare($sqlW);
                $stmtw->bind_param('di',$total,$userId);
                $stmtw->execute();
            }

            $points = floor($total / 10);
            $this->userModel->adjustWalletAndPoints($userId, 0, $points);

            $this->notifModel->create($userId, "Booking confirmed (#$bookingId).");

            $this->db->commit();
            return ['booking_id'=>$bookingId];
        } catch (Exception $e){
            $this->db->rollback();
            return ['error'=>$e->getMessage()];
        }
    }

    public function cancelBooking($bookingId, $userId){
        $this->db->begin_transaction();
        try {
            $booking = $this->bookingModel->getById($bookingId);
            if(!$booking) throw new Exception("Booking not found");
            if($booking['user_id'] != $userId) throw new Exception("Unauthorized");

            if($booking['type'] == 'flight'){
                $sql = "SELECT departure_time FROM flights WHERE flight_id = ?";
                $stmt = $this->db->prepare($sql);
                $stmt->bind_param('i', $booking['ref_id']);
                $stmt->execute();
                $f = $stmt->get_result()->fetch_assoc();
                $dep = new DateTime($f['departure_time']);
                $now = new DateTime();
                $hours = ($dep->getTimestamp() - $now->getTimestamp()) / 3600;
                $refundAmount = ($hours > 48) ? $booking['total_amount'] : ($booking['total_amount'] * 0.5);
                $this->bookingModel->updateStatus($bookingId, 'cancelled');
                $this->bookingModel->createRefund($bookingId, $refundAmount, 'User cancelled');
                $sql2 = "UPDATE users SET wallet = wallet + ? WHERE user_id = ?";
                $stmt2 = $this->db->prepare($sql2);
                $stmt2->bind_param('di', $refundAmount, $userId);
                $stmt2->execute();
                $sql3 = "UPDATE flights SET seats_available = seats_available + 1 WHERE flight_id = ?";
                $stmt3 = $this->db->prepare($sql3);
                $stmt3->bind_param('i', $booking['ref_id']);
                $stmt3->execute();
                $this->notifModel->create($userId, "Refund of $refundAmount processed for booking #$bookingId");
            }

            $this->db->commit();
            return ['success'=>true];
        } catch (Exception $e){
            $this->db->rollback();
            return ['error'=>$e->getMessage()];
        }
    }

    public function bookHotel($userId, $roomId, $nights = 1, $rooms = 1, $paymentMethod = 'wallet'){
        $this->db->begin_transaction();
        try {
            $room = $this->hotelModel->getRoomById($roomId);
            if(!$room) throw new Exception('Room not found');
            $adjust = $this->hotelModel->adjustRoomAvailability($roomId, -$rooms);
            if(is_array($adjust) && isset($adjust['error'])) throw new Exception($adjust['error']);

            $total = (float)$room['price'] * (int)$nights * (int)$rooms;
            $create = $this->bookingModel->create([
                'user_id'=>$userId,
                'type'=>'hotel',
                'ref_id'=>$roomId,
                'total_amount'=>$total,
                'status'=>'confirmed'
            ]);
            if(isset($create['error'])) throw new Exception($create['error']);
            $bookingId = $create['booking_id'];

            $details = json_encode(['hotel_id'=>$room['hotel_id'],'room_id'=>$roomId,'room_type'=>$room['room_type'],'nights'=>$nights,'rooms'=>$rooms]);
            $this->bookingModel->addItem($bookingId, $details, $total);

            if($paymentMethod === 'wallet'){
                $sqlW = "UPDATE users SET wallet = wallet - ? WHERE user_id = ?";
                $stmtw = $this->db->prepare($sqlW);
                $stmtw->bind_param('di',$total,$userId);
                $stmtw->execute();
            }

            $points = floor($total / 10);
            $this->userModel->adjustWalletAndPoints($userId, 0, $points);
            $this->notifModel->create($userId, "Hotel booking confirmed (#$bookingId).");

            $this->db->commit();
            return ['booking_id'=>$bookingId];
        } catch (Exception $e){
            $this->db->rollback();
            try { $this->hotelModel->adjustRoomAvailability($roomId, $rooms); } catch(Exception $ignore) {}
            return ['error'=>$e->getMessage()];
        }
    }

    public function bookPackage($userId, $pkgId, $paymentMethod = 'wallet'){
        $this->db->begin_transaction();
        try {
            $pkg = $this->packageModel->getById($pkgId);
            if(!$pkg) throw new Exception('Package not found');
            $total = (float)$pkg['price'];
            $create = $this->bookingModel->create([
                'user_id'=>$userId,
                'type'=>'package',
                'ref_id'=>$pkgId,
                'total_amount'=>$total,
                'status'=>'confirmed'
            ]);
            if(isset($create['error'])) throw new Exception($create['error']);
            $bookingId = $create['booking_id'];

            $details = json_encode(['pkg_id'=>$pkgId,'title'=>$pkg['title']]);
            $this->bookingModel->addItem($bookingId, $details, $total);

            if($paymentMethod === 'wallet'){
                $sqlW = "UPDATE users SET wallet = wallet - ? WHERE user_id = ?";
                $stmtw = $this->db->prepare($sqlW);
                $stmtw->bind_param('di',$total,$userId);
                $stmtw->execute();
            }

            $points = floor($total / 10);
            $this->userModel->adjustWalletAndPoints($userId, 0, $points);
            $this->notifModel->create($userId, "Package booking confirmed (#$bookingId).");

            $this->db->commit();
            return ['booking_id'=>$bookingId];
        } catch (Exception $e){
            $this->db->rollback();
            return ['error'=>$e->getMessage()];
        }
    }
}
?>
