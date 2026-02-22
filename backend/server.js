const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL)`);
  db.run(`CREATE TABLE IF NOT EXISTS drives (id INTEGER PRIMARY KEY AUTOINCREMENT, model_number TEXT NOT NULL, power_kw REAL, voltage_type TEXT, description TEXT)`);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    if (row) res.json({ success: true, user: row });
    else res.status(401).json({ success: false });
  });
});

app.get('/api/drives', (req, res) => {
  db.all(`SELECT * FROM drives`, [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(5000);
