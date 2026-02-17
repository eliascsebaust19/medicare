
-- MySQL Database Schema for MediCare Pharmacy BD

CREATE DATABASE IF NOT EXISTS medicare_bd;
USE medicare_bd;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    blood_group VARCHAR(5),
    is_donor BOOLEAN DEFAULT FALSE,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2), -- Added for discounts
    image TEXT,
    description TEXT,
    in_stock BOOLEAN DEFAULT TRUE,
    requires_prescription BOOLEAN DEFAULT FALSE,
    brand VARCHAR(100),
    rating DECIMAL(2, 1) DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- Custom order ID format
    user_id INT,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('cod', 'bkash', 'nagad') NOT NULL,
    transaction_id VARCHAR(50),
    status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50),
    product_id INT,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Blood Donors Table
CREATE TABLE blood_donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    last_donation DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Initial Products)
INSERT INTO products (name, category, price, original_price, brand, in_stock, requires_prescription, image, description) VALUES
('Napa Extra 500mg', 'OTC Medicine', 25, NULL, 'Beximco', TRUE, FALSE, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae', 'Effective relief from fever and mild to moderate pain.'),
('Seclo 20mg Capsule', 'Prescription Medicine', 70, NULL, 'Square', TRUE, TRUE, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de', 'Used for the treatment of acidity, heartburn, and gastric ulcers.'),
('Savlon Antiseptic Liquid', 'First Aid', 100, 110, 'ACI', TRUE, FALSE, 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a', 'Strong antiseptic liquid for first aid and personal hygiene.'),
('Pampers Baby Diapers (L)', 'Baby Care', 1050, 1200, 'Pampers', TRUE, FALSE, 'https://images.unsplash.com/photo-1519689680058-324335c77eba', 'Premium diapers for babies ensuring dryness and comfort.');
