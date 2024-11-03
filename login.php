<?php
session_start();

// Veritabanı bağlantısı
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_database";

$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

// Formdan gelen verileri alın
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Kullanıcıyı kontrol et
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Şifre doğrulama
        if (password_verify($password, $user['password'])) {
            $_SESSION['email'] = $email;
            echo "Giriş başarılı!"; // Burada kullanıcıyı yönlendirebiliriz
        } else {
            echo "Hatalı şifre!";
        }
    } else {
        echo "Kullanıcı bulunamadı!";
    }
}

$conn->close();
?>
