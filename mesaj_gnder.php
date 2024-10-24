<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form verilerini alıyoruz
    $name = $_POST['fullname'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // E-posta bilgileri
    $to = "seninmailadresi@ornek.com";  // Kendi e-posta adresini buraya yaz
    $subject = "İletişim Formu Mesajı";
    $body = "Ad Soyad: $name\nEmail: $email\nMesaj:\n$message";
    
    // Gönderenin e-posta adresini başlık kısmına ekleyelim
    $headers = "From: $email";

    // E-postayı gönderiyoruz
    if (mail($to, $subject, $body, $headers)) {
        echo "Mesaj başarıyla gönderildi!";
    } else {
        echo "Mesaj gönderilirken bir hata oluştu.";
    }
}
?>
