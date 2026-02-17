
/**
 * MediCare Pharmacy BD - Backend Server
 * 
 * Instructions to run:
 * 1. Install dependencies: npm install express mysql2 cors body-parser dotenv
 * 2. Create .env file with DB_HOST, DB_USER, DB_PASS, DB_NAME
 * 3. Run: node server.js
 */

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'medicare_bd',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Helper: Query Database
const db = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// --- ROUTES ---

// 1. Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const results = await db('SELECT * FROM products');
        // Map snake_case to camelCase for frontend if needed, 
        // but easier to keep consistency. For now returning as is.
        // Frontend expects 'originalPrice', DB has 'original_price'.
        // Let's do a quick map
        const mappedResults = results.map(p => ({
            ...p,
            originalPrice: p.original_price,
            inStock: p.in_stock,
            requiresPrescription: p.requires_prescription
        }));
        res.json(mappedResults);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Add Product (Admin)
app.post('/api/products', async (req, res) => {
    const { name, category, price, originalPrice, image, description, inStock, requiresPrescription, brand } = req.body;
    try {
        const sql = `INSERT INTO products (name, category, price, original_price, image, description, in_stock, requires_prescription, brand) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await db(sql, [name, category, price, originalPrice || null, image, description, inStock, requiresPrescription, brand]);
        res.json({ id: result.insertId, message: 'Product added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Delete Product (Admin)
app.delete('/api/products/:id', async (req, res) => {
    try {
        await db('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Place Order
app.post('/api/orders', async (req, res) => {
    const { id, customerName, phone, address, totalAmount, paymentMethod, transactionId, items } = req.body;
    
    // Transaction
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();

        const orderSql = `INSERT INTO orders (id, customer_name, phone, address, total_amount, payment_method, transaction_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await connection.query(orderSql, [id, customerName, phone, address, totalAmount, paymentMethod, transactionId]);

        for (const item of items) {
            const itemSql = `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)`;
            await connection.query(itemSql, [id, item.product.id, item.quantity, item.product.price]);
        }

        await connection.commit();
        res.json({ message: 'Order placed successfully', orderId: id });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// 5. Get All Orders (Admin)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await db('SELECT * FROM orders ORDER BY order_date DESC');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Update Order Status (Admin)
app.put('/api/orders/:id', async (req, res) => {
    const { status } = req.body;
    try {
        await db('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Order status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Blood Donors
app.get('/api/donors', async (req, res) => {
    try {
        const donors = await db('SELECT * FROM blood_donors');
        res.json(donors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/donors', async (req, res) => {
    const { name, bloodGroup, location, phone } = req.body;
    try {
        await db('INSERT INTO blood_donors (name, blood_group, location, phone) VALUES (?, ?, ?, ?)', [name, bloodGroup, location, phone]);
        res.json({ message: 'Donor registered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to MySQL Database: ${process.env.DB_NAME || 'medicare_bd'}`);
});
