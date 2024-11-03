<?php
// Veritabanı bağlantısı
$servername = "localhost";
$username = "root"; // Genellikle "root" veya veritabanı kullanıcı adı
$password = ""; // Veritabanı parolanız
$dbname = "user_database"; // Veritabanı adınız

$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

// Formdan gelen verileri alın
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Şifreyi güvenli hale getiriyoruz

    // Veritabanına ekleyin
    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Kayıt başarılı!";
    } else {
        echo "Hata: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
