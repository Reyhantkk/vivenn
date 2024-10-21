let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel'); // 'carousel' sınıfı için nokta eklenmeli.
let listItemDom = document.querySelector('.carousel .list'); // 'carousel .list' için nokta eklenmeli.
let thumbnailDom = document.querySelector('.carousel .thumbnail'); // 'carousel .thumbnail' için nokta eklenmeli.

nextDom.onclick = function() {
   showSlider('next');
}
prevDom.onclick = function() {
    showSlider('prev');
}
let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runAutoRun = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type){
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if(type == 'next'){
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    }else{
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() =>{
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
    
    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
    
}
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
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
    password: 'yourpassword',  // MySQL root şifreni gir
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
