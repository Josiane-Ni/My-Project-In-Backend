-- travel_schema.sql
CREATE DATABASE IF NOT EXISTS travel_booking;
USE travel_booking;


-- USERS
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('customer','agent','admin') DEFAULT 'customer',
  wallet DECIMAL(10,2) DEFAULT 0.00,
  loyalty_points INT DEFAULT 0,
  email_verified TINYINT(1) DEFAULT 0,
  verification_token VARCHAR(64) NULL,
  verification_sent_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- For existing databases, run the following commands to add the phone column and indexes:
-- ALTER TABLE users ADD COLUMN phone VARCHAR(20);
-- CREATE INDEX idx_email ON users (email);
-- CREATE INDEX idx_role ON users (role);


-- FLIGHTS
CREATE TABLE flights (
  flight_id INT AUTO_INCREMENT PRIMARY KEY,
  airline VARCHAR(100) NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  departure_time DATETIME NOT NULL,
  arrival_time DATETIME NOT NULL,
  seats_total INT NOT NULL,
  seats_available INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- HOTELS
CREATE TABLE hotels (
  hotel_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  stars TINYINT NOT NULL,
  amenities_json TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ROOMS
CREATE TABLE rooms (
  room_id INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT NOT NULL,
  room_type VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  available_qty INT NOT NULL,
  FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id) ON DELETE CASCADE
);


-- PACKAGES
CREATE TABLE packages (
  pkg_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  includes_flights BOOL DEFAULT 0,
  includes_hotels BOOL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- BOOKINGS
CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('flight','hotel','package') NOT NULL,
  ref_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending','confirmed','cancelled','refunded') DEFAULT 'pending',
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- BOOKING ITEMS
CREATE TABLE booking_items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  details_json TEXT,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);


-- LOYALTY POINTS
CREATE TABLE loyalty_points (
  lp_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  points INT NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- REVIEWS
CREATE TABLE reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  target_type ENUM('flight','hotel','package') NOT NULL,
  target_id INT NOT NULL,
  rating TINYINT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- PROMOTIONS
CREATE TABLE promotions (
  promo_id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  discount DECIMAL(5,2) NOT NULL,
  expiry_date DATE,
  usage_limit INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- NOTIFICATIONS
CREATE TABLE notifications (
  notif_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50),
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- REFUNDS
CREATE TABLE refunds (
  refund_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  reason TEXT,
  status ENUM('pending','processed','rejected') DEFAULT 'pending',
  processed_at TIMESTAMP NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);


-- AUDIT LOGS
CREATE TABLE audit_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Sample data
INSERT INTO users (name,email,password,role,wallet,loyalty_points) VALUES
('Test User','customer@example.com','$2y$10$EXAMPLEHASHSHOULDBEREPLACED','customer',100.00,200),
('Agent One','agent@example.com','$2y$10$EXAMPLEHASH','agent',0.00,0),
('Admin','admin@example.com','$2y$10$EXAMPLEHASH','admin',0.00,0);


INSERT INTO flights (airline,origin,destination,departure_time,arrival_time,seats_total,seats_available,price) VALUES
('Rwanda Air','Kigali','Dubai','2025-12-01 09:00:00','2025-12-01 15:00:00',200,200,450.00),
('SkyWings','Kigali','Nairobi','2025-12-05 07:30:00','2025-12-05 08:45:00',150,150,120.00);


INSERT INTO hotels (name,city,stars,amenities_json,description) VALUES
('Kigali Grand','Kigali',5,'{"wifi":true,"pool":true}','Luxury hotel in Kigali center'),
('Budget Inn','Nairobi',3,'{"wifi":true}','Comfortable budget hotel');


INSERT INTO rooms (hotel_id,room_type,price,available_qty) VALUES
(1,'Deluxe',150.00,10),
(1,'Standard',90.00,20),
(2,'Standard',60.00,15);
