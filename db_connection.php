<?php
// Veritabanı bağlantısı
$servername = "localhost";
$username = "root";
$password = "DAVUTtok-1"; // MySQL root kullanıcısının parolası
$dbname = "user_database";

// Bağlantıyı oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}
?>
