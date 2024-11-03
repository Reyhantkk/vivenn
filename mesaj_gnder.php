<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form verilerini alıyoruz
    $name = htmlspecialchars($_POST['fullname']);  // Güvenlik için girişleri temizliyoruz
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    // Hedef e-posta adresi
    $to = "davut@vovienn.com, info@vovienn.com";
     // Buraya kendi e-posta adresinizi yazın
    $subject = "İletişim Formu Mesajı";
    $body = "Ad Soyad: $name\nEmail: $email\nMesaj:\n$message";
    
    // E-posta başlıklarını ayarlıyoruz
    $headers = "From: $email";

    // E-postayı gönderiyoruz
    if (mail($to, $subject, $body, $headers)) {
        echo "Mesaj başarıyla gönderildi!";
    } else {
        echo "Mesaj gönderilirken bir hata oluştu.";
    }
}
?>
