const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// MySQL Veritabanı Bağlantısı
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1c11c9fc1.D',  // MySQL root şifreni gir
    database: 'kullanici_sistemi'  // Kullanıcı bilgilerini saklayacağın veritabanı
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL bağlantısı başarılı.');
});

// Kullanıcı Kaydı (Register)
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Şifreyi hashleyelim
    const hashedPassword = await bcrypt.hash(password, 10);

    // Veritabanına ekle
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.query(sql, [email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Kayıt sırasında bir hata oluştu.');
        }
        res.send('Kayıt başarılı!');
    });
});

// Kullanıcı Girişi (Login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Email ile kullanıcıyı veritabanında bul
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Giriş sırasında bir hata oluştu.');
        }

        if (results.length === 0) {
            return res.status(400).send('Kullanıcı bulunamadı.');
        }

        const user = results[0];

        // Şifreyi Doğrula
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Yanlış şifre.');
        }

        res.send('Giriş başarılı!');
    });
});

// Sunucuyu Başlat
app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor');
});
